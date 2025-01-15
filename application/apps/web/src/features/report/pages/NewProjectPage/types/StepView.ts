type CommonStepView = {
	label: string;
	component: (props: { onNext: () => void }) => JSX.Element;
};

type FormStepView = CommonStepView & {
	formName: string;
};

type ComponentStepView = CommonStepView & {
	formName?: never;
};

export type StepView = FormStepView | ComponentStepView;
