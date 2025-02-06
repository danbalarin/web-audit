import { Skeleton, Stack } from "@mui/material";

export const ProjectListSkeleton = () => (
	<Stack spacing={2} p={2}>
		<Skeleton variant="rounded" height={32} />
		<Skeleton variant="rounded" height={32} />
		<Skeleton variant="rounded" height={32} />
	</Stack>
);
