import { BaseRunner } from "@repo/api";
import { type AuditMetricResult, type BaseContext } from "@repo/api/types";
// @ts-ignore
import lighthouse, { type Flags, type Result } from "lighthouse";
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

	async transform(_result: Result): Promise<AuditMetricResult[]> {
		const audits = _result.audits as Record<
			LighthousePerformanceAudits,
			Result["audits"][keyof Result["audits"]]
		>;

		return [
			{
				id: "largest-contentful-paint",
				value: audits["largest-contentful-paint"].numericValue ?? -1,
			},
		];
	}

	async run(context: BaseContext): Promise<AuditMetricResult[]> {
		const res = await this.runRaw(context);

		return this.transform(res);
	}

	async runRaw(context: BaseContext): Promise<Result> {
		const options = {
			output: "json",
			onlyCategories: ["performance"],
			onlyAudits: [
				"first-contentful-paint",
				"largest-contentful-paint",
				"first-meaningful-paint",
				"speed-index",
				"total-blocking-time",
				"max-potential-fid",
				"cumulative-layout-shift",
				"interaction-to-next-paint",
			],
		} satisfies Flags;

		const runs = [];
		for (let i = 0; i < this._options.numberOfRuns; i++) {
			const page = await context.browser.newPage();
			const result = await lighthouse(context.url, options, undefined, page);
			await page.close();
			if (!result?.artifacts) {
				//TODO
				throw new Error("Could not run lighthouse", { cause: "No artifacts" });
			}
			runs.push(result.lhr);
		}

		try {
			const result: Result = computeMedianRun(runs);
			return result;
		} catch (error) {
			//TODO
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
