import puppeteer from "puppeteer";

export const createBrowserContext = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });

    return {
      browser,
    };
  } catch (error) {
    console.error("Error creating browser context\n", error);

    return {
      browser: null,
    };
  }
};
