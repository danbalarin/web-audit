import { BaseRunner } from "@repo/api";
import { type BaseContext, type MetricResult } from "@repo/api/types";
// @ts-ignore
import lighthouse, { type Flags, type Result } from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config";
// @ts-ignore
import { computeMedianRun } from "lighthouse/core/lib/median-run.js";

export type LighthouseRunnerOptions = {
	/**
	 * Number of runs to perform, results will be averaged
	 *
	 * @default 1
	 */
	numberOfRuns?: number;
};

type PerformanceResult = Result & { requests: string[] };

export class LighthouseRunner extends BaseRunner<Result> {
	private readonly _options: Required<LighthouseRunnerOptions>;

	constructor(_options: LighthouseRunnerOptions) {
		super();

		this._options = Object.assign(
			{
				numberOfRuns: 1,
			},
			_options,
		);
	}

	async transform(result: PerformanceResult): Promise<MetricResult[]> {
		const audits = result.audits as Record<
			LighthousePerformanceAudits,
			Result["audits"][keyof Result["audits"]]
		>;

		return [
			{
				id: "time-to-first-byte",
				value: audits["server-response-time"].numericValue ?? -1,
			},
			{
				id: "first-contentful-paint",
				value: audits["first-contentful-paint"].numericValue ?? -1,
			},
			{
				id: "largest-contentful-paint",
				value: audits["largest-contentful-paint"].numericValue ?? -1,
			},
			{
				id: "transfer-size",
				value: audits["total-byte-weight"].numericValue ?? -1,
			},
			{
				id: "total-blocking-time",
				value: audits["total-blocking-time"].numericValue ?? -1,
			},
			{
				id: "cumulative-layout-shift",
				value: audits["cumulative-layout-shift"].numericValue ?? -1,
			},
			{
				id: "speed-index",
				value: audits["speed-index"].numericValue ?? -1,
			},
			{
				id: "max-potential-fid",
				value: audits["max-potential-fid"].numericValue ?? -1,
			},
			{
				id: "total-requests",
				value: result.requests.length,
			},
		];
	}

	async run(context: BaseContext): Promise<MetricResult[]> {
		const res = await this.runRaw(context);

		return this.transform(res);
	}

	async runRaw(context: BaseContext): Promise<PerformanceResult> {
		const options = {
			output: "json",
			onlyCategories: ["performance"],
			onlyAudits: [
				"server-response-time",
				"first-contentful-paint",
				"total-byte-weight",
				"total-blocking-time",
				"cumulative-layout-shift",
				"speed-index",
				"max-potential-fid",
			],
		} satisfies Flags;

		const runs = { lhr: [] as Result[], requests: [] as string[][] };
		for (let i = 0; i < this._options.numberOfRuns; i++) {
			const requests = [] as string[];
			const browser = await context.createBrowser();

			const page = await browser.newPage();
			page.on("request", (req) => {
				requests.push(req.url());
			});
			const result = await lighthouse(
				context.url,
				options,
				desktopConfig,
				page,
			);

			await browser.close();
			if (!result?.artifacts) {
				throw new Error("Could not run lighthouse", { cause: "No artifacts" });
			}
			runs.lhr.push(result.lhr);
			runs.requests.push(requests);
		}

		try {
			const result: Result = computeMedianRun(runs.lhr);
			const medianRequests = runs.requests
				.map((a, i) => ({ run: i, requests: a }))
				.sort((a, b) => a.requests.length - b.requests.length)[
				Math.floor(runs.requests.length / 2)
			]?.requests;
			return { ...result, requests: medianRequests ?? runs.requests[0] ?? [] };
		} catch (error) {
			return { ...(runs.lhr[0] as Result), requests: runs.requests[0] ?? [] };
			throw new Error("Could not compute median run", { cause: error });
		}
	}
}

type LighthousePerformanceAudits =
	| "bf-cache"
	| "bootup-time"
	| "critical-request-chains"
	| "cumulative-layout-shift"
	| "diagnostics"
	| "dom-size"
	| "duplicated-javascript"
	| "efficient-animated-content"
	| "final-screenshot"
	| "first-contentful-paint"
	| "first-meaningful-paint"
	| "font-display"
	| "interactive"
	| "largest-contentful-paint"
	| "largest-contentful-paint-element"
	| "layout-shift-elements"
	| "lcp-lazy-loaded"
	| "legacy-javascript"
	| "long-tasks"
	| "main-thread-tasks"
	| "mainthread-work-breakdown"
	| "max-potential-fid"
	| "metrics"
	| "modern-image-formats"
	| "network-requests"
	| "network-rtt"
	| "network-server-latency"
	| "no-document-write"
	| "non-composited-animations"
	| "offscreen-images"
	| "performance-budget"
	| "prioritize-lcp-image"
	| "redirects"
	| "render-blocking-resources"
	| "screenshot-thumbnails"
	| "script-treemap-data"
	| "server-response-time"
	| "speed-index"
	| "third-party-facades"
	| "third-party-summary"
	| "timing-budget"
	| "total-blocking-time"
	| "total-byte-weight"
	| "unminified-css"
	| "unminified-javascript"
	| "unsized-images"
	| "unused-css-rules"
	| "unused-javascript"
	| "user-timings"
	| "uses-http2"
	| "uses-long-cache-ttl"
	| "uses-optimized-images"
	| "uses-passive-event-listeners"
	| "uses-rel-preconnect"
	| "uses-rel-preload"
	| "uses-responsive-images"
	| "uses-text-compression"
	| "viewport";
