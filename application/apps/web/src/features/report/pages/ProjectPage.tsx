import React from "react";

type Props = {
	params: {
		projectName: string;
	};
};

export function ProjectPage({ params: { projectName } }: Props) {
	console.log("ProjectPage", projectName);

	return <div>ProjectPage {projectName}</div>;
}
