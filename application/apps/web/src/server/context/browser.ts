import puppeteer from "puppeteer";

export const createBrowserContext = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.CHROMIUM_PATH,
      args: ["--no-sandbox"],
    });

    return {
      browser,
    };
  } catch (error) {
    throw new Error("Error creating browser context", { cause: error });
  }
};
