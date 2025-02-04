type ProjectPageParams = Promise<{
	projectId: string;
}>;

type ProjectPageProps = {
	params: ProjectPageParams;
};

export async function ProjectPage({ params }: ProjectPageProps) {
	return <div>ProjectPage {(await params).projectId}</div>;
}
