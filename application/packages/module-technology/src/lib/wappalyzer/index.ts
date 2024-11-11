/// <reference path="../../types/wappalyzer-core.d.ts" />
import Wappalyzer from "wappalyzer-core";
import Driver from "./driver.js";
import { categories, technologies } from "./technologies";
import { BaseContext } from "@repo/api";

type WappalyzerTechnologyResult = {
  slug: string;
  name: string;
  description: string;
  confidence: number;
  version: string | null;
  icon: string | null;
  website: string | null;
  cpe: string | null;
  categories: string[];
  rootPath?: boolean;
};

type AnalyzeOkResult = {
  urls: {
    [url: string]: {
      status: number;
    };
  };
  technologies: WappalyzerTechnologyResult[];
  patterns?: unknown;
};

type AnalyzeErrorResult = {
  error: string;
};

export type AnalyzeResult = AnalyzeOkResult | AnalyzeErrorResult;

export const analyze = async (context: BaseContext): Promise<AnalyzeResult> => {
  Wappalyzer.setCategories(categories);
  Wappalyzer.setTechnologies(technologies);

  const driver = new Driver({ browser: context.browser });
  let error: string | null = null;

  try {
    const site = await driver.open(context.url);

    site.on("error", (scopedError: any) => {
      error = scopedError.toString();
    });

    const results = await site.analyze();
    if (error) {
      return { error };
    }
    return results as AnalyzeOkResult;
  } catch (error: any) {
    return { error: error.toString() };
  }
};
