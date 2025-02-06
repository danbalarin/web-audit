"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Card, CardHeader, IconButton } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { ConfirmationDialog } from "~/features/ui/components/ConfirmationDialog";

import { trpc } from "~/server/query/client";

type HeadingCardProps = {
	id: string;
};

export const HeadingCard = ({ id }: HeadingCardProps) => {
	const [open, setOpen] = useState(false);
	const [project] = trpc.projects.findById.useSuspenseQuery({ id });
	const { mutateAsync } = trpc.projects.delete.useMutation();

	return (
		<Card>
			<CardHeader
				title={project.name}
				subheader={`Last updated on ${format(project.updatedAt, "PPP")}`}
				action={
					<>
						<IconButton aria-label="run audit" color="primary">
							<PlayArrowIcon />
						</IconButton>
						<IconButton
							aria-label="delete"
							onClick={() => {
								setOpen(true);
								// void trpc.projects.updateById.prefetch({ id });
							}}
							color="error"
						>
							<DeleteIcon />
						</IconButton>
					</>
				}
			/>
			<ConfirmationDialog
				title="Delete Project"
				content="Are you sure you want to delete this project?"
				accentColor="error"
				open={open}
				onClose={() => setOpen(false)}
				onConfirm={async () => {
					await mutateAsync({ id });
					setOpen(false);
				}}
			/>
		</Card>
	);
};

HeadingCard.displayName = "HeadingCard";
