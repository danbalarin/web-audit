import type { Page } from "puppeteer";

export const safeWaitForLoad = async (page: Page) => {
	try {
		await page.waitForNavigation({
			waitUntil: "networkidle2",
		});
	} catch (_e) {
		// Continue
	}
};
