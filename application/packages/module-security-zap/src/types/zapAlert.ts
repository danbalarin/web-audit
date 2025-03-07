import { Confidence } from "./confidence";
import { Risk } from "./risk";

export type ZapAlert = {
	sourceid: string;
	other: string;
	method: string;
	evidence: string;
	pluginId: string;
	cweid: string;
	confidence: Confidence;
	sourceMessageId: number;
	wascid: string;
	description: string;
	messageId: string;
	inputVector: string;
	url: string;
	tags: Record<string, string>[];
	reference: string;
	solution: string;
	alert: string;
	param: string;
	attack: string;
	name: string;
	risk: Risk;
	id: string;
	alertRef: string;
};
