import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import puppeteer from "puppeteer";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const browser = await puppeteer.launch({ headless: "new" });

  return {
    browser,
  };
};
