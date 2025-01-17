type Props = {
	params: {
		projectName: string;
	};
};

export function ProjectPage({ params: { projectName } }: Props) {
	return <div>ProjectPage {projectName}</div>;
}
