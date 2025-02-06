import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";
import { useState } from "react";

type ConfirmationDialogProps = {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void | Promise<void>;
	title: string;
	content: string;
	confirmText?: string;
	cancelText?: string;
	accentColor?:
		| "primary"
		| "secondary"
		| "error"
		| "success"
		| "info"
		| "warning";
};

export const ConfirmationDialog = ({
	open,
	onClose,
	onConfirm,
	title,
	content,
	confirmText,
	cancelText,
	accentColor,
}: ConfirmationDialogProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleConfirm = async () => {
		setIsLoading(true);
		await onConfirm();
		setIsLoading(false);
	};

	return (
		<Dialog maxWidth="xs" open={open} color={accentColor} onClose={onClose}>
			<DialogTitle color={accentColor}>{title}</DialogTitle>
			<DialogContent>
				<Typography>{content}</Typography>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={onClose} disabled={isLoading}>
					{cancelText ?? "Cancel"}
				</Button>
				<Button onClick={handleConfirm} color={accentColor} loading={isLoading}>
					{confirmText ?? "Confirm"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

ConfirmationDialog.displayName = "ConfirmationDialog";
