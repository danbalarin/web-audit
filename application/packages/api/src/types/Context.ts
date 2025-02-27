import type { Browser } from "puppeteer";

export type BaseContext = {
	createBrowser: () => Promise<Browser>;
	url: string;
};
