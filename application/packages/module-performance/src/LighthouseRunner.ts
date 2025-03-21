import { BaseRunner, spawnChild } from "@repo/api";
import type {
	BaseContext,
	BaseRunnerOptions,
	MetricResult,
} from "@repo/api/types";
import type { Result } from "lighthouse";
// @ts-ignore
import { computeMedianRun } from "lighthouse/core/lib/median-run.js";
import { CumulativeLayoutShift } from "./metrics/cumulative-layout-shift";
import { FirstContentfulPaint } from "./metrics/first-contentful-paint";
import { LargestContentfulPaint } from "./metrics/largest-contentful-paint";
import { MaxPotentialFID } from "./metrics/max-potential-fid";
import { SpeedIndex } from "./metrics/speed-index";
import { TimeToFirstByte } from "./metrics/time-to-first-byte";
import { TotalBlockingTime } from "./metrics/total-blocking-time";
import { TransferSize } from "./metrics/transfer-size";

export type LighthouseRunnerOptions = BaseRunnerOptions & {
	/**
	 * Number of runs to perform, results will be averaged
	 *
	 * @default 1
	 */
	numberOfRuns?: number;
};
export class LighthouseRunner extends BaseRunner<
	Result,
	BaseContext,
	Required<LighthouseRunnerOptions>
> {
	constructor(_options: LighthouseRunnerOptions) {
		const options = Object.assign(
			{
				numberOfRuns: 1,
			},
			_options,
		);
		super("LighthouseRunner", options);
	}

	async transform(result: Result): Promise<MetricResult[]> {
		const audits = result.audits as Record<
			LighthousePerformanceAudits,
			Result["audits"][keyof Result["audits"]]
		>;

		return [
			{
				id: TimeToFirstByte.id,
				value: audits["server-response-time"].numericValue ?? -1,
			},
			{
				id: FirstContentfulPaint.id,
				value: audits["first-contentful-paint"].numericValue ?? -1,
			},
			{
				id: LargestContentfulPaint.id,
				value: audits["largest-contentful-paint"].numericValue ?? -1,
			},
			{
				id: TransferSize.id,
				value: audits["total-byte-weight"].numericValue ?? -1,
			},
			{
				id: TotalBlockingTime.id,
				value: audits["total-blocking-time"].numericValue ?? -1,
			},
			{
				id: CumulativeLayoutShift.id,
				value: audits["cumulative-layout-shift"].numericValue ?? -1,
			},
			{
				id: SpeedIndex.id,
				value: audits["speed-index"].numericValue ?? -1,
			},
			{
				id: MaxPotentialFID.id,
				value: audits["max-potential-fid"].numericValue ?? -1,
			},
		];
	}

	async run(context: BaseContext): Promise<MetricResult[]> {
		const res = await this.runRaw(context);

		return this.transform(res);
	}

	async runRaw(context: BaseContext): Promise<Result> {
		const runs = { lhr: [] as Result[], requests: [] as string[][] };
		for (let i = 0; i < this._options.numberOfRuns; i++) {
			const requests = [] as string[];
			const result = await spawnChild<Result>("lighthouse", [
				context.url,
				"--preset=desktop",
				"--quiet",
				"--output=json",
				'--chrome-flags="--headless"',
				"--only-categories=performance",
				"--only-audits=server-response-time,first-contentful-paint,total-byte-weight,total-blocking-time,cumulative-layout-shift,speed-index,max-potential-fid",
			]);

			runs.lhr.push(result);
			runs.requests.push(requests);
		}

		try {
			const result: Result = computeMedianRun(runs.lhr);
			return result;
		} catch (error) {
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
