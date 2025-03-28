"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useQueryState } from "nuqs";

import { useCallback } from "react";
import { JobsTable } from "~/features/report/components/JobsTable";
import { useDeleteAudit } from "~/features/report/hooks/useDeleteAudit";
import { RoundedAccordion } from "~/features/ui/components/RoundedAccordion";
import { useDialogContext } from "~/features/ui/contexts/DialogContext";
import { trpc } from "~/server/query/client";
import { AUDIT_SEARCH_PARAMS, auditsSearchParams } from "../../searchParams";

type RunsCardProps = {
	projectId: string;
};

export const RunsCard = ({ projectId }: RunsCardProps) => {
	const [project] = trpc.projects.findById.useSuspenseQuery({ id: projectId });
	const [selectedAudits, setSelectedAudits] = useQueryState(
		AUDIT_SEARCH_PARAMS,
		auditsSearchParams[AUDIT_SEARCH_PARAMS],
	);
	const { mutateAsync: deleteAudit } = useDeleteAudit();
	const { confirm } = useDialogContext();

	const onDelete = useCallback(
		(id: string) =>
			confirm("Are you sure you want to delete this audit?", {
				cancelText: "Cancel",
				okText: "Delete",
				severity: "error",
				title: "Delete audit",
				onClose: (result) => {
					if (result === "ok") {
						deleteAudit({ id });
					}
				},
			}),
		[confirm, deleteAudit],
	);

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
					selected={selectedAudits}
					onSelectedChange={setSelectedAudits}
					onDelete={onDelete}
				/>
			</AccordionDetails>
		</RoundedAccordion>
	);
};

RunsCard.displayName = "RunsCard";
