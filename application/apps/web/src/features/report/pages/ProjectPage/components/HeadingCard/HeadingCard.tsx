"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Card, CardHeader, IconButton, Tooltip } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { ConfirmationDialog } from "~/features/ui/components/ConfirmationDialog";

import { trpc } from "~/server/query/client";
import { RunAuditModal } from "../RunAuditModal";

type HeadingCardProps = {
	id: string;
};

export const HeadingCard = ({ id }: HeadingCardProps) => {
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [runAuditOpen, setRunAuditOpen] = useState(false);
	const [project] = trpc.projects.findById.useSuspenseQuery({ id });
	const { mutateAsync } = trpc.projects.delete.useMutation();

	return (
		<Card>
			<CardHeader
				title={project.name}
				subheader={`Last updated on ${format(project.updatedAt, "PPP")}`}
				action={
					<>
						<Tooltip title="Run Audit">
							<IconButton
								aria-label="run audit"
								color="primary"
								onClick={() => setRunAuditOpen(true)}
							>
								<PlayArrowIcon />
							</IconButton>
						</Tooltip>
						<IconButton
							aria-label="delete"
							onClick={() => {
								setDeleteOpen(true);
								// void trpc.projects.updateById.prefetch({ id });
							}}
							color="error"
						>
							<DeleteIcon />
						</IconButton>
					</>
				}
			/>
			<RunAuditModal
				projectId={id}
				open={runAuditOpen}
				onClose={() => setRunAuditOpen(false)}
			/>
			<ConfirmationDialog
				title="Delete Project"
				content="Are you sure you want to delete this project?"
				accentColor="error"
				open={deleteOpen}
				onClose={() => setDeleteOpen(false)}
				onConfirm={async () => {
					await mutateAsync({ id });
					setDeleteOpen(false);
				}}
			/>
		</Card>
	);
};

HeadingCard.displayName = "HeadingCard";
