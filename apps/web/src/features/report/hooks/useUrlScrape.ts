import { api } from "~/lib/api";

export type UseUrlScrapeOptions = {};

export type UseUrlScrapeCompleteResult = {
  ok: boolean;
  document: string;
};

export type UseUrlScrapeResult = {
  run: (url: string) => Promise<UseUrlScrapeCompleteResult>;
};

export const useUrlScrape = (): UseUrlScrapeResult => {
  const scrapeUrl = api.useUtils().scraper.scrapeBrowser.fetch;

  const run = (url: string) =>
    new Promise<UseUrlScrapeCompleteResult>((res, rej) => {
      scrapeUrl({ url })
        .then(res)
        .catch((error) => {
          rej({ ok: false, document: "", error });
        });
    });

  return { run };
};
