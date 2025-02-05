import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Status =
	| "idle"
	| `urlCheckInProgress.${string}`
	| "urlCheckComplete"
	| "error";

type ConnectionCheckState = {
	status: Status;
	urlsOk: Record<string, boolean>;
	error?: string;
	checkUrlResult: (url: string, ok: boolean) => void;
};

export const useConnectionCheckState = create<ConnectionCheckState>()(
	devtools(
		(set, get) => ({
			status: "idle",
			urlsOk: {},
			checkUrlResult: (url: string, ok: boolean) => {
				const urls = get().urlsOk;
				urls[url] = ok;
				set({ urlsOk: urls });
			},
		}),
		{ name: "ConnectionCheck" },
	),
);
