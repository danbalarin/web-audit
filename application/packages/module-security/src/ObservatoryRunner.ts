import { BaseRunner } from "@repo/api";
import { BaseContext, BaseRunnerOptions, MetricResult } from "@repo/api/types";

import { type ObservatoryResult, scan } from "@mdn/mdn-http-observatory";
import { ContentSecurityPolicy } from "./metrics/content-security-policy";
import { Cookies, CookiesFlags, getValueFromFlags } from "./metrics/cookies";
import { CrossOriginResourceSharing } from "./metrics/cross-origin-resource-sharing";
import { StrictTransportSecurity } from "./metrics/strict-transport-security";
import { XFrameOptions, XFrameOptionsValue } from "./metrics/x-frame-options";

export type ObservatoryRunnerOptions = BaseRunnerOptions;

type Result = ObservatoryResult;

export class ObservatoryRunner extends BaseRunner {
	constructor(options: ObservatoryRunnerOptions) {
		super("ObservatoryRunner", options);
	}
	async transform(result: Result): Promise<MetricResult[]> {
		const { tests } = result;

		return [
			{
				id: ContentSecurityPolicy.id,
				value: tests["content-security-policy"].pass ? 1 : 0,
				additionalData: tests["content-security-policy"],
			},
			{
				id: Cookies.id,
				value: getValueFromFlags(
					cookieResultToFlagsMap[
						tests.cookies.result as keyof typeof cookieResultToFlagsMap
					],
				),
				additionalData: tests.cookies,
			},
			{
				id: CrossOriginResourceSharing.id,
				value: tests["cross-origin-resource-sharing"].pass ? 1 : 0,
				additionalData: tests["cross-origin-resource-sharing"],
			},
			{
				id: StrictTransportSecurity.id,
				value: tests["strict-transport-security"].pass ? 1 : 0,
				additionalData: tests["strict-transport-security"],
			},
			{
				id: XFrameOptions.id,
				value: getXFrameOptionsValue(tests["x-frame-options"].data),
				additionalData: tests["x-frame-options"],
			},
		];
	}

	async run(context: BaseContext): Promise<MetricResult[]> {
		const res = await this.runRaw(context);

		return this.transform(res);
	}

	async runRaw(context: BaseContext): Promise<Result> {
		const { hostname } = new URL(context.url);
		return scan(hostname);
	}
}

const cookieResultToFlagsMap = {
	"cookies-not-found": [],
	"cookies-anticsrf-without-samesite-flag": [CookiesFlags.PRESENT],
	"cookies-samesite-flag-invalid": [CookiesFlags.PRESENT],
	"cookies-secure-with-httponly-sessions-and-samesite": [
		CookiesFlags.PRESENT,
		CookiesFlags.SAME_SITE,
		CookiesFlags.HTTP_ONLY,
		CookiesFlags.SECURE,
	],
	"cookies-secure-with-httponly-sessions": [
		CookiesFlags.PRESENT,
		CookiesFlags.HTTP_ONLY,
		CookiesFlags.SECURE,
	],
	"cookies-session-without-httponly-flag": [
		CookiesFlags.PRESENT,
		CookiesFlags.SAME_SITE,
		CookiesFlags.SECURE,
	],
	"cookies-session-without-secure-flag-but-protected-by-hsts": [
		CookiesFlags.PRESENT,
		CookiesFlags.SAME_SITE,
		CookiesFlags.HTTP_ONLY,
	],
	"cookies-session-without-secure-flag": [
		CookiesFlags.PRESENT,
		CookiesFlags.SAME_SITE,
		CookiesFlags.HTTP_ONLY,
	],
	"cookies-without-secure-flag-but-protected-by-hsts": [
		CookiesFlags.PRESENT,
		CookiesFlags.SAME_SITE,
		CookiesFlags.HTTP_ONLY,
	],
	"cookies-without-secure-flag": [
		CookiesFlags.PRESENT,
		CookiesFlags.SAME_SITE,
		CookiesFlags.HTTP_ONLY,
	],
};

const getXFrameOptionsValue = (value?: string): XFrameOptionsValue => {
	switch (value) {
		case "DENY":
			return XFrameOptionsValue.DENY;
		case "SAMEORIGIN":
			return XFrameOptionsValue.SAMEORIGIN;
		default:
			if (value?.startsWith("ALLOW-FROM")) {
				return XFrameOptionsValue.ALLOW_FROM;
			} else {
				return XFrameOptionsValue.NOT_SET;
			}
	}
};
