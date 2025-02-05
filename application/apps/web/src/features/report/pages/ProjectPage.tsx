import { ErrorMessage } from "~/features/ui/components/ErrorMessage";

type ProjectPageParams = Promise<{
	projectId: string;
}>;

type ProjectPageProps = {
	params: ProjectPageParams;
};

export async function ProjectPage({ params }: ProjectPageProps) {
	const id = (await params).projectId;
	return <ErrorMessage title="Not Found" subtitle={`id:${id} `} />;
}
