"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useState } from "react";
import { JobsTable } from "~/features/report/components/JobsTable";

import { RoundedAccordion } from "~/features/ui/components/RoundedAccordion";
import { trpc } from "~/server/query/client";

type RunsCardProps = {
	projectId: string;
};

export const RunsCard = ({ projectId }: RunsCardProps) => {
	const [project] = trpc.projects.findById.useSuspenseQuery({ id: projectId });
	const [selectedAudits, setSelectedAudits] = useState<string[]>([]);

	return (
		<RoundedAccordion defaultExpanded>
			<AccordionSummary
				sx={{ boxSizing: "border-box", position: "relative" }}
				expandIcon={<ExpandMoreIcon />}
			>
				<Typography sx={{ width: "33%", flexShrink: 0 }} component="span">
					Runs
				</Typography>
				<Typography
					sx={{
						color: "text.secondary",
						position: "absolute",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						inset: 0,
					}}
				>
					Selected {selectedAudits.length}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<JobsTable
					jobs={project.jobs}
					onSelectedChange={setSelectedAudits}
					onDelete={console.log}
				/>
			</AccordionDetails>
		</RoundedAccordion>
	);
};

RunsCard.displayName = "RunsCard";
