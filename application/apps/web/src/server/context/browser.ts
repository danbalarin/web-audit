import puppeteer from "puppeteer";

export const createBrowserContext = async () => {
  const browser = await puppeteer.launch({ headless: "shell" });

  return {
    browser,
  };
};
