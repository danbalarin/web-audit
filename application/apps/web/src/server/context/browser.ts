import puppeteer from "puppeteer";

import { env } from "~/env.mjs";

export const createBrowserContext = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: env.CHROMIUM_PATH,
      args: ["--no-sandbox"],
    });

    return {
      browser,
    };
  } catch (error) {
    throw new Error(`Error creating browser context`, { cause: error });
  }
};
