import { AxePuppeteer } from "@axe-core/puppeteer";
import { BaseRunner } from "@repo/api";
import type {
	BaseContext,
	BaseRunnerOptions,
	MetricResult,
} from "@repo/api/types";
import type { Result as AxeAuditResult } from "axe-core";
import { ACT } from "./metrics/act";
import { BEST_PRACTICE } from "./metrics/best-practice";
import { WCAG2A } from "./metrics/wcag2a";
import { WCAG2AA } from "./metrics/wcag2aa";
import { WCAG2AAA } from "./metrics/wcag2aaa";
import { WCAG21A } from "./metrics/wcag21a";
import { WCAG21AA } from "./metrics/wcag21aa";
import { WCAG22AA } from "./metrics/wcag22aa";
import { AxeResult } from "./types/AxeResult";

export type AxeRunnerOptions = BaseRunnerOptions;

type Result = Awaited<ReturnType<AxePuppeteer["analyze"]>>;

type AdditionalData = Record<
	AxeResult,
	Pick<AxeAuditResult, "id" | "impact">[]
>;

export class AxeRunner extends BaseRunner<Result> {
	constructor(options: AxeRunnerOptions) {
		super("AxeRunner", options);
	}

	protected async transform(result: Result): Promise<MetricResult[]> {
		const tags = {} as Record<string, AdditionalData>;

		const process = (arr: AxeAuditResult[], type: AxeResult) => {
			for (const res of arr) {
				for (const tag of res.tags) {
					if (!tags[tag]) {
						tags[tag] = {
							[AxeResult.PASS]: [],
							[AxeResult.INAPPLICABLE]: [],
							[AxeResult.INCOMPLETE]: [],
							[AxeResult.VIOLATION]: [],
						};
					}
					tags[tag][type].push({ id: res.id, impact: res.impact });
				}
			}
		};

		process(result?.violations ?? [], AxeResult.VIOLATION);
		process(result?.passes ?? [], AxeResult.PASS);
		process(result?.incomplete ?? [], AxeResult.INCOMPLETE);
		process(result?.inapplicable ?? [], AxeResult.INAPPLICABLE);

		const calculate = (res: AdditionalData) => {
			const pass = res[AxeResult.PASS].length;
			const incomplete = res[AxeResult.INCOMPLETE].length;
			const violation = res[AxeResult.VIOLATION].length;
			const total = pass + incomplete + violation;
			return total === 0 ? -1 : pass / total;
		};

		const composeMetric = (tag: string) => ({
			id: tag,
			value: tags[tag] ? calculate(tags[tag]) : -1,
			additionalData: tags[tag],
		});

		return [
			composeMetric(WCAG2A.id),
			composeMetric(WCAG2AA.id),
			composeMetric(WCAG2AAA.id),
			composeMetric(WCAG21A.id),
			composeMetric(WCAG21AA.id),
			composeMetric(WCAG22AA.id),
			composeMetric(BEST_PRACTICE.id),
			composeMetric(ACT.id),
		];
	}

	async run(context: BaseContext): Promise<MetricResult[]> {
		const res = await this.runRaw(context);

		return this.transform(res);
	}

	protected async runRaw(context: BaseContext): Promise<Result> {
		const browser = await context.createBrowser();
		const page = await browser.newPage();
		await page.setBypassCSP(true);
		await page.goto(context.url);
		await page.waitForNetworkIdle({ idleTime: 1000 });

		try {
			const results = await new AxePuppeteer(page).analyze();
			return results;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}

type _AxeAccessibilityAudits =
	| "accesskeys"
	| "area-alt"
	| "aria-allowed-attr"
	| "aria-allowed-role"
	| "aria-braille-equivalent"
	| "aria-command-name"
	| "aria-conditional-attr"
	| "aria-deprecated-role"
	| "aria-dialog-name"
	| "aria-hidden-focus"
	| "aria-input-field-name"
	| "aria-meter-name"
	| "aria-progressbar-name"
	| "aria-prohibited-attr"
	| "aria-required-attr"
	| "aria-required-children"
	| "aria-required-parent"
	| "aria-roles"
	| "aria-text"
	| "aria-toggle-field-name"
	| "aria-tooltip-name"
	| "aria-treeitem-name"
	| "aria-valid-attr-value"
	| "aria-valid-attr"
	| "autocomplete-valid"
	| "avoid-inline-spacing"
	| "blink"
	| "button-name"
	| "definition-list"
	| "dlitem"
	| "duplicate-id-aria"
	| "empty-table-header"
	| "form-field-multiple-labels"
	| "frame-focusable-content"
	| "frame-tested"
	| "frame-title-unique"
	| "frame-title"
	| "html-lang-valid"
	| "html-xml-lang-mismatch"
	| "image-alt"
	| "image-redundant-alt"
	| "input-button-name"
	| "input-image-alt"
	| "label-title-only"
	| "label"
	| "landmark-banner-is-top-level"
	| "landmark-complementary-is-top-level"
	| "landmark-contentinfo-is-top-level"
	| "landmark-main-is-top-level"
	| "landmark-no-duplicate-banner"
	| "landmark-no-duplicate-contentinfo"
	| "landmark-no-duplicate-main"
	| "landmark-unique"
	| "link-in-text-block"
	| "list"
	| "listitem"
	| "marquee"
	| "meta-refresh"
	| "nested-interactive"
	| "object-alt"
	| "presentation-role-conflict"
	| "role-img-alt"
	| "scope-attr-valid"
	| "scrollable-region-focusable"
	| "select-name"
	| "server-side-image-map"
	| "skip-link"
	| "svg-img-alt"
	| "tabindex"
	| "table-duplicate-name"
	| "td-headers-attr"
	| "th-has-data-cells"
	| "valid-lang"
	| "video-caption"
	| "no-autoplay-audio"
	| "aria-hidden-body"
	| "bypass"
	| "color-contrast"
	| "document-title"
	| "empty-heading"
	| "heading-order"
	| "link-name"
	| "meta-viewport-large"
	| "meta-viewport"
	| "page-has-heading-one"
	| "region"
	| "html-has-lang"
	| "landmark-one-main"
	| "region";
