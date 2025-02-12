import { createLoader, parseAsArrayOf, parseAsString } from "nuqs/server";

export const AUDIT_SEARCH_PARAMS = "audits";

export const auditsSearchParams = {
	[AUDIT_SEARCH_PARAMS]: parseAsArrayOf(parseAsString).withDefault([]),
};

export const loadSearchParams = createLoader(auditsSearchParams);
