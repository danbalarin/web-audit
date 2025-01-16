import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Step } from "./types/Steps";

// type ConnectionSpeed = {
// 	speed: number;
// };

// const useConnectionSpeed = create<ConnectionSpeed>()((set) => ({
// 	speed: 0,
// }));

// type InitialScrape = {
// 	urls: { [k: string]: string };
// 	setUrlData: (url: string, data: string) => void;
// };

// const useInitialScrape = create<InitialScrape>()((set) => ({
// 	urls: {},
// 	setUrlData: (url: string, data: string) => set({ urls: { [url]: data } }),
// }));

type NewProjectState = {
	activeStep: Step;
	stepComplete: boolean;
	canGoBack: () => boolean;
	canGoNext: () => boolean;
	goBack: () => void;
	goNext: () => void;
};

export const useNewProjectState = create<NewProjectState>()(
	devtools(
		(set, get) => ({
			activeStep: Step.ProjectDetails,
			stepComplete: false,
			canGoBack: () => {
				const currentStep = get().activeStep;
				return currentStep > 0;
			},
			canGoNext: () => {
				const currentStep = get().activeStep;
				if (currentStep === Object.keys(Step).length - 1) {
					return false;
				}
				return get().stepComplete;
			},
			goBack: () => {
				if (!get().canGoBack()) {
					return;
				}
				const currentStep = get().activeStep;
				set({ activeStep: currentStep - 1 });
			},
			goNext: () => {
				if (!get().canGoNext()) {
					return;
				}
				set((s) => ({ activeStep: s.activeStep + 1, stepComplete: false }));
			},
		}),
		{ name: "NewProjectState" },
	),
);
