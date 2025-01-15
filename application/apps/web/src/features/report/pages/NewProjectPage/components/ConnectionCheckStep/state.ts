import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { UseSpeedTestCompleteResult } from "~/features/report/hooks/useSpeedTest";

type Status =
	| "idle"
	| "speedCheckInProgress"
	| "speedCheckComplete"
	| `urlCheckInProgress.${string}`
	| "urlCheckComplete"
	| "error";

type ConnectionCheckState = {
	status: Status;
	speed?: UseSpeedTestCompleteResult;
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
