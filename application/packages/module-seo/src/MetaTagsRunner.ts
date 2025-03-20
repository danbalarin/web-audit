import { BaseRunner } from "@repo/api";
import { type BaseContext, type MetricResult } from "@repo/api/types";
import { Page } from "puppeteer";

import { template as facebookTemplate } from "./templates/facebook";

// biome-ignore lint/complexity/noBannedTypes: placeholder
export type MetaTagsRunnerOptions = {};

type BasicTags = {
	title?: string | null;
	description?: string | null;
	keywords?: string | null;
	author?: string | null;
	viewport?: string | null;
};

type OpenGraphTags = {
	title?: string | null;
	description?: string | null;
	image?: string | null;
	url?: string | null;
	type?: string | null;
	siteName?: string | null;
	locale?: string | null;
};

type TwitterTags = {
	card?: string | null;
	site?: string | null;
	creator?: string | null;
	title?: string | null;
	description?: string | null;
	image?: string | null;
};

type Tags = {
	basic: BasicTags;
	openGraph: OpenGraphTags;
	twitter: TwitterTags;
};

type Result = Tags & {
	facebookImage: string;
	twitterImage: string;
};

export class MetaTagsRunner extends BaseRunner<Result> {
	private readonly _options: Required<MetaTagsRunnerOptions>;

	constructor(_options: MetaTagsRunnerOptions) {
		super("MetaTagsRunner");

		this._options = Object.assign({}, _options);
	}

	async transform(result: Result): Promise<MetricResult[]> {
		console.log(result);

		return [];
	}

	async run(context: BaseContext): Promise<MetricResult[]> {
		const res = await this.runRaw(context);

		return this.transform(res);
	}

	private async getBasicMetaTags(page: Page) {
		const res = await page.evaluate(() => {
			const title = document.title;
			const description = document.querySelector("meta[name='description']");
			const keywords = document.querySelector("meta[name='keywords']");
			const author = document.querySelector("meta[name='author']");
			const viewport = document.querySelector("meta[name='viewport']");

			return {
				title,
				description: description?.getAttribute("content"),
				keywords: keywords?.getAttribute("content"),
				author: author?.getAttribute("content"),
				viewport: viewport?.getAttribute("content"),
			};
		});

		return res;
	}

	private async getOpenGraphMetaTags(page: Page) {
		const res = await page.evaluate(() => {
			const title = document.querySelector("meta[property='og:title']");
			const description = document.querySelector(
				"meta[property='og:description']",
			);
			const image = document.querySelector("meta[property='og:image']");
			const url = document.querySelector("meta[property='og:url']");
			const type = document.querySelector("meta[property='og:type']");
			const siteName = document.querySelector("meta[property='og:site_name']");
			const locale = document.querySelector("meta[property='og:locale']");

			return {
				title: title?.getAttribute("content"),
				description: description?.getAttribute("content"),
				image: image?.getAttribute("content"),
				url: url?.getAttribute("content"),
				type: type?.getAttribute("content"),
				siteName: siteName?.getAttribute("content"),
				locale: locale?.getAttribute("content"),
			};
		});

		return res;
	}

	private async getTwitterMetaTags(page: Page) {
		const res = await page.evaluate(() => {
			const card = document.querySelector("meta[name='twitter:card']");
			const site = document.querySelector("meta[name='twitter:site']");
			const creator = document.querySelector("meta[name='twitter:creator']");
			const title = document.querySelector("meta[name='twitter:title']");
			const description = document.querySelector(
				"meta[name='twitter:description']",
			);
			const image = document.querySelector("meta[name='twitter:image']");

			return {
				card: card?.getAttribute("content"),
				site: site?.getAttribute("content"),
				creator: creator?.getAttribute("content"),
				title: title?.getAttribute("content"),
				description: description?.getAttribute("content"),
				image: image?.getAttribute("content"),
			};
		});

		return res;
	}

	private async renderFacebookPreview(
		page: Page,
		{
			openGraph,
			basic,
			url,
		}: { url: string } & Pick<Tags, "openGraph" | "basic">,
	) {
		const facebook = facebookTemplate({
			title: openGraph?.title ?? basic?.title,
			description: openGraph?.description ?? basic?.description,
			url_full: url,
			url_short: url.replace(/https?:\/\//, "").replace(/\/.*/, ""),
			image: openGraph?.image,
		});
		await page.setContent(facebook);
		await page.waitForNetworkIdle({ idleTime: 1000 });
		const image = await (await page.waitForSelector(".card"))?.screenshot({
			encoding: "base64",
		});

		if (!image) {
			throw new Error("Failed to render Facebook preview");
		}

		return `data:image/png;base64,${image}`;
	}

	async runRaw(context: BaseContext): Promise<Result> {
		const browser = await context.createBrowser();
		const page = await browser.newPage();
		await page.setBypassCSP(true);
		await page.goto(context.url);
		await page.waitForNetworkIdle({ idleTime: 1000 });

		const promises = [
			this.getBasicMetaTags(page),
			this.getOpenGraphMetaTags(page),
			this.getTwitterMetaTags(page),
		] as const;

		const [basic, openGraph, twitter] = await Promise.all(promises);

		let facebookImage = "";
		try {
			facebookImage = await this.renderFacebookPreview(page, {
				basic,
				openGraph,
				url: context.url,
			});
		} catch (error) {
			// TODO: Handle error
			console.error(error);
		}

		try {
			return {
				basic: basic ?? {},
				openGraph: openGraph ?? {},
				twitter: twitter ?? {},
				facebookImage,
				twitterImage: "",
			};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
