import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Step } from "../types/Steps";

type NewProjectState = {
	project: {
		name: string;
		homeUrl: string;
		urls: string[];
	};
	activeStep: Step;
	stepComplete: boolean;
	canGoBack: () => boolean;
	canGoNext: () => boolean;
	goBack: () => void;
	goNext: () => void;
	clear: () => void;
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
			clear: () => {
				set({
					activeStep: Step.ProjectDetails,
					stepComplete: false,
					project: undefined,
				});
			},
		}),
		{ name: "NewProjectState" },
	),
);
