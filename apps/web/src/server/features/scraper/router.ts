import { t } from "~/server/trpc";

import { procedure as scrapeBrowserProcedure } from "./procedures/scrapeBrowser";
import { procedure as scrapeFetchProcedure } from "./procedures/scrapeFetch";

export const router = t.router({
  scrapeFetch: scrapeFetchProcedure,
  scrapeBrowser: scrapeBrowserProcedure,
});
