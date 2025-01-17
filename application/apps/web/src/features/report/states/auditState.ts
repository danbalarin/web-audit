import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type UrlAuditData = {
	isHome: boolean;
	html?: string;
	data?: unknown;
};

export type AuditState = {
	name: string;
	urls: { [k: string]: UrlAuditData };
	connectionSpeed: number;
	addUrl: (url: string, isHome: boolean) => void;
	addUrlData: (
		url: string,
		data: Partial<Omit<UrlAuditData, "isHome">>,
	) => void;
};

export const useAuditState = create<AuditState>()(
	persist(
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
				addUrlData: (
					url: string,
					data: Partial<Omit<UrlAuditData, "isHome">>,
				) => {
					set((state) => {
						const urls = state.urls;
						if (urls[url]) {
							urls[url] = { ...urls[url], ...data };
						}
						return { urls };
					});
				},
			}),
			{ name: "AuditState" },
		),
		{
			name: "AuditState",
		},
	),
);
