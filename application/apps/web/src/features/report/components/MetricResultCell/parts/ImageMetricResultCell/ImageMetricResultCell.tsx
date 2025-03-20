import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import React from "react";

type ImageMetricResultCellProps = {
	title: string;
	image: string;
};

export const ImageMetricResultCell = ({
	title,
	image,
}: ImageMetricResultCellProps) => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Button variant="outlined" onClick={handleClickOpen}>
				Open Preview
			</Button>
			<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<Box sx={{ width: "100%" }} component="img" src={image} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

ImageMetricResultCell.displayName = "ImageMetricResultCell";
