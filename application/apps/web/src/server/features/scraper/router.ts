import { createTRPCRouter } from "~/server/trpc";

import { procedure as scrapeBrowserProcedure } from "./procedures/scrapeBrowser";
import { procedure as scrapeFetchProcedure } from "./procedures/scrapeFetch";

export const router = createTRPCRouter({
	scrapeFetch: scrapeFetchProcedure,
	scrapeBrowser: scrapeBrowserProcedure,
});
