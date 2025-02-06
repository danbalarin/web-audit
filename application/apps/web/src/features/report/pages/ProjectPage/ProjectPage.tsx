import { Suspense } from "react";
import { trpc } from "~/server/query/server";
import { HeadingCard, HeadingCardSkeleton } from "./components/HeadingCard";

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
			<Suspense fallback={<HeadingCardSkeleton />}>
				<HeadingCard id={id} />
			</Suspense>
		</>
	);
}
