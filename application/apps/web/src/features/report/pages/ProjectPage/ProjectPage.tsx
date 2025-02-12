import { Divider, Stack } from "@mui/material";
import { Suspense } from "react";
import { trpc } from "~/server/query/server";
import { CategoryList } from "./components/CategoryList";
import { HeadingCard, HeadingCardSkeleton } from "./components/HeadingCard";
import { RunsCard, RunsCardSkeleton } from "./components/RunsCard";

type ProjectPageParams = Promise<{
	projectId: string;
}>;

type ProjectPageProps = {
	params: ProjectPageParams;
};

export async function ProjectPage({ params }: ProjectPageProps) {
	const id = (await params).projectId;
	void trpc.projects.findById.prefetch({ id });
	return (
		<>
			<Stack spacing={2}>
				<Suspense fallback={<HeadingCardSkeleton />}>
					<HeadingCard id={id} />
				</Suspense>
				<Suspense fallback={<RunsCardSkeleton />}>
					<RunsCard projectId={id} />
				</Suspense>
				<Divider />
				<CategoryList projectId={id} />
			</Stack>
		</>
	);
}
