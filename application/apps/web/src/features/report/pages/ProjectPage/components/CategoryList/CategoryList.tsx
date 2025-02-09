"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { AuditCategoryDetail } from "~/features/report/components/AuditCategoryDetail";
import { RoundedAccordion } from "~/features/ui/components/RoundedAccordion";
import { trpc } from "~/server/query/client";

type CategoryListProps = {
	projectId: string;
};

export const CategoryList = ({ projectId }: CategoryListProps) => {
	const [_project] = trpc.projects.findById.useSuspenseQuery({ id: projectId });

	return (
		<RoundedAccordion defaultExpanded>
			<AccordionSummary
				sx={{ boxSizing: "border-box", position: "relative" }}
				expandIcon={<ExpandMoreIcon />}
			>
				<Typography sx={{ width: "33%", flexShrink: 0 }} component="span">
					Performance
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<AuditCategoryDetail data={[]} />
			</AccordionDetails>
		</RoundedAccordion>
	);
};

CategoryList.displayName = "CategoryList";
