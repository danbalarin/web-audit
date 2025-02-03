import type { Browser } from "puppeteer";

export type BaseContext = {
	browser: Browser;
	url: string;
};
