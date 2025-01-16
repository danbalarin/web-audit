import { Accordion, AccordionProps } from "@mui/material";

type RoundedAccordionProps = AccordionProps;

export const RoundedAccordion = ({ sx, ...props }: RoundedAccordionProps) => {
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
				...sx,
			}}
			{...props}
		/>
	);
};

RoundedAccordion.displayName = "RoundedAccordion";
