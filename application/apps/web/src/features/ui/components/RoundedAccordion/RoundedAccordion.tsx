import { Accordion, type AccordionProps } from "@mui/material";

type RoundedAccordionProps = Omit<AccordionProps, "sx">;

export const RoundedAccordion = (props: RoundedAccordionProps) => {
	return (
		<Accordion
			disableGutters
			sx={{
				mb: 2,
				borderRadius: 2,
				border: "none",
				"&:before": {
					display: "none",
				},
			}}
			{...props}
		/>
	);
};

RoundedAccordion.displayName = "RoundedAccordion";
