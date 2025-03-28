type CommonMetricRowDefinition = {
	label: string;
	value: string[];
};

type InputMetricRowDefinition = CommonMetricRowDefinition & {
	type: "input";
	dataKey: string;
};

type TextMetricRowDefinition = CommonMetricRowDefinition & {
	type: "text";
};

export type MetricRowDefinition =
	| InputMetricRowDefinition
	| TextMetricRowDefinition;
