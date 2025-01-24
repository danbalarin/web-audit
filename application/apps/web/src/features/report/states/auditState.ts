import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type UrlAuditData = {
	isHome: boolean;
	html?: string;
	data?: unknown;
	jobId?: string;
};

export type AuditState = {
	name: string;
	urls: { [k: string]: UrlAuditData };
	connectionSpeed: number;
	addUrlData: (
		url: string,
		data: Partial<Omit<UrlAuditData, "isHome">>,
	) => void;
};

export const useAuditState = create<AuditState>()(
	persist(
		devtools(
			(set) => ({
				name: "",
				urls: {},
				connectionSpeed: 0,
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
