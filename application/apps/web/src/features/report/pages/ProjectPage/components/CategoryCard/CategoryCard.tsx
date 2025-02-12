import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import type { CategoryDescription } from "@repo/api/types";
import { AuditCategoryDetail } from "~/features/report/components/AuditCategoryDetail";
import { RoundedAccordion } from "~/features/ui/components/RoundedAccordion";

type CategoryCardProps = {
	category: CategoryDescription;
};

export const CategoryCard = ({ category }: CategoryCardProps) => {
	return (
		<RoundedAccordion defaultExpanded>
			<AccordionSummary
				sx={{ boxSizing: "border-box", position: "relative" }}
				expandIcon={<ExpandMoreIcon />}
			>
				<Typography>{category.name}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<AuditCategoryDetail category={category} data={[]} />
			</AccordionDetails>
		</RoundedAccordion>
	);
};

CategoryCard.displayName = "CategoryCard";
