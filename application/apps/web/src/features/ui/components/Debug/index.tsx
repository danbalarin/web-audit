"use client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Drawer,
	Stack,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material-pigment-css";
import { useState } from "react";
import { useDebugContext } from "~/features/ui/contexts/DebugContext";

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
	backgroundColor: "rgba(255,255,255, 0.05)",
	borderEndEndRadius: theme.shape.borderRadius,
	borderEndStartRadius: theme.shape.borderRadius,
}));

export function Debug() {
	const { machines } = useDebugContext();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<>
			<Button
				onClick={handleOpen}
				variant="outlined"
				color="warning"
				sx={{ position: "absolute", top: "1rem", right: "1rem" }}
			>
				Debug
			</Button>
			<Drawer open={open} onClose={handleClose} anchor="right">
				<Stack sx={{ width: "420px", height: "100%", p: "1rem" }}>
					<Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
						XState
					</Typography>
					{Object.entries(machines).map(([name, m]) => (
						<Accordion key={name}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								{name}
							</AccordionSummary>
							<StyledAccordionDetails sx={{ overflow: "scroll" }}>
								<pre>{JSON.stringify(m, null, 2)}</pre>
							</StyledAccordionDetails>
						</Accordion>
					))}
				</Stack>
			</Drawer>
		</>
	);
}
