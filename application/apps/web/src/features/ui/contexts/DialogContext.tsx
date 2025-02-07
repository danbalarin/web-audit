"use client";

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import type { PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useState } from "react";

type DialogContextType = {
	confirm: (message: string, options?: ConfirmOptions) => void;
	// alert: (message: string, options?: ConfirmOptions) => void;
	// prompt: (message: string, options?: ConfirmOptions) => void;
	// open: (options: DialogOptions) => void;
	close: () => void;
};

const DialogContext = createContext<DialogContextType>({
	confirm: () => void 0,
	close: () => void 0,
});

type CommonDialogOptions = {
	title?: string;
	severity?: "error" | "info" | "success" | "warning";
	onClose?: (result: "ok" | "cancel") => void | Promise<void>;
};

type ConfirmOptions = CommonDialogOptions & {
	okText?: string;
	cancelText?: string;
};

type AlertOptions = CommonDialogOptions & {
	okText?: string;
};

type DialogOptions = ConfirmOptions | AlertOptions;

export const DialogContextProvider = ({ children }: PropsWithChildren) => {
	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState<"ok" | "cancel">();
	const [dialogOptions, setDialogOptions] = useState<DialogOptions>({});

	const close = useCallback(() => {
		setIsOpen(false);
	}, []);

	const confirm = useCallback((message: string, options?: ConfirmOptions) => {
		setMessage(message);
		if (options) {
			setDialogOptions(options);
		}
		setIsOpen(true);
	}, []);

	const onClose = useCallback(
		async (result: "ok" | "cancel") => {
			setIsLoading(result);
			if (dialogOptions?.onClose) {
				await dialogOptions.onClose(result);
			}
			setIsLoading(undefined);
			close();
		},
		[dialogOptions, close],
	);

	return (
		<DialogContext.Provider value={{ close, confirm }}>
			<Dialog
				open={isOpen}
				onClose={() => onClose("cancel")}
				color={dialogOptions.severity}
			>
				{dialogOptions.title && (
					<DialogTitle>{dialogOptions.title}</DialogTitle>
				)}
				<DialogContent>{message}</DialogContent>
				<DialogActions>
					{"cancelText" in dialogOptions && (
						<Button
							onClick={() => onClose("cancel")}
							disabled={isLoading === "ok"}
							loading={isLoading === "cancel"}
						>
							{dialogOptions.cancelText}
						</Button>
					)}
					<Button
						onClick={() => onClose("ok")}
						color={dialogOptions.severity}
						disabled={isLoading === "cancel"}
						loading={isLoading === "ok"}
					>
						{dialogOptions.okText || "Ok"}
					</Button>
				</DialogActions>
			</Dialog>
			{children}
		</DialogContext.Provider>
	);
};

export const useDialogContext = () => {
	const context = useContext(DialogContext);

	if (!context) {
		throw new Error(
			"useDialogContext must be used within a DialogContextProvider",
		);
	}

	return context;
};
