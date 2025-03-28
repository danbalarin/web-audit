export type ModuleStatus = {
	status: "processing" | "complete" | "error";
	progress: number;
	additionalData?: object;
};
