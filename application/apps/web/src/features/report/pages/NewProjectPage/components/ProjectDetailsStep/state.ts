import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ProjectDetailsFormState = {
	projectName: string;
	homeUrl: string;
	urls: string[];
};

export const useProjectDetailsFormState = create<ProjectDetailsFormState>()(
	devtools(
		() => ({
			projectName: "",
			homeUrl: "",
			urls: [] as string[],
		}),
		{ name: "ProjectDetailsForm" },
	),
);
