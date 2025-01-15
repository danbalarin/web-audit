import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type UrlAuditData = {
	isHome: boolean;
	html?: string;
	gatherers?: unknown;
};

export type AuditState = {
	name: string;
	urls: { [k: string]: UrlAuditData };
	connectionSpeed: number;
	addUrl: (url: string, isHome: boolean) => void;
};

export const useAuditState = create<AuditState>()(
	devtools(
		(set, get) => ({
			name: "",
			urls: {},
			connectionSpeed: 0,
			addUrl: (url: string, isHome: boolean) => {
				const urls = get().urls;
				urls[url] = { isHome };
				set({ urls });
			},
		}),
		{ name: "AuditState" },
	),
);
