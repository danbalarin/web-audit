"use client";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	LinearProgress,
	List,
	Tooltip,
	Typography,
} from "@mui/material";
import { useNotifications } from "@toolpad/core/useNotifications";
import React, { useMemo } from "react";
import { useProcessUrls } from "~/features/report/hooks/useProcessUrls";
import { trpc } from "~/server/query/client";
import { Option } from "./parts/Option";

type RunAuditModalProps = {
	projectId: string;
	open: boolean;
	onClose: () => void;
};

export const RunAuditModal = ({
	projectId,
	open,
	onClose,
}: RunAuditModalProps) => {
	const [project] = trpc.projects.findById.useSuspenseQuery({ id: projectId });
	const [selected, setSelected] = React.useState<string[]>([]);
	const urls = useMemo(() => [project.homeUrl, ...project.urls], [project]);
	const notification = useNotifications();
	const { run, progress, isRunning } = useProcessUrls({ onDone: onClose });

	const handleClose = () => {
		if (isRunning) {
			notification.show("Please wait for the audit to finish", {
				severity: "warning",
				key: "run-audit",
				autoHideDuration: 5000,
			});
			return;
		}
		onClose();
	};

	const createOnClick = (url: string) => () => {
		setSelected((prev) =>
			prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url],
		);
	};

	return (
		<Dialog
			maxWidth="md"
			open={open}
			disableEscapeKeyDown
			onClose={handleClose}
		>
			<DialogTitle>Run audit on {project.name}</DialogTitle>
			<DialogContent>
				<Typography>Select the URLs you want to audit</Typography>
				<List>
					<Option
						onClick={() =>
							setSelected(selected.length === urls.length ? [] : urls)
						}
						indeterminate={selected.length > 0 && selected.length < urls.length}
						selected={selected.length === urls.length}
						disabled={isRunning}
						text="All"
					/>
					{urls.map((url) => (
						<Option
							key={url}
							onClick={createOnClick(url)}
							selected={selected.includes(url)}
							disabled={isRunning}
							text={url}
						/>
					))}
				</List>
				{isRunning && (
					<LinearProgress
						variant={progress === 0 ? "indeterminate" : "determinate"}
						value={progress * 100}
					/>
				)}
			</DialogContent>
			<DialogActions>
				<Tooltip
					title={
						isRunning
							? "Please wait for the audit to finish"
							: selected.length === 0
								? "Select at least one URL"
								: ""
					}
				>
					<span>
						<Button
							autoFocus
							color="primary"
							variant="contained"
							onClick={() => run({ urls: selected, projectId })}
							disabled={selected.length === 0}
							loading={isRunning}
						>
							Run
						</Button>
					</span>
				</Tooltip>
			</DialogActions>
		</Dialog>
	);
};

RunAuditModal.displayName = "RunAuditModal";
