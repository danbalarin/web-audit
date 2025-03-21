import { BaseRunner } from "@repo/api";
import type {
	BaseContext,
	BaseRunnerOptions,
	MetricResult,
} from "@repo/api/types";
import type { Page } from "puppeteer";

import { FacebookPreview } from "./metrics/facebook-preview";
import {
	OpenGraphMetaTags,
	OpenGraphMetaTagsFlags,
	getValueFromFlags as getOpenGraphValueFromFlags,
} from "./metrics/open-graph-meta-tags";
import {
	SEOMetaTags,
	SEOMetaTagsFlags,
	getValueFromFlags as getSeoValueFromFlags,
} from "./metrics/seo-meta-tags";
import {
	TwitterMetaTags,
	TwitterMetaTagsFlags,
	getValueFromFlags as getTwitterValueFromFlags,
} from "./metrics/twitter-meta-tags";
import { TwitterPreview } from "./metrics/twitter-preview";
import { template as facebookTemplate } from "./templates/facebook";
import { template as twitterTemplate } from "./templates/twitter";

export type MetaTagsRunnerOptions = BaseRunnerOptions;

type BasicTags = {
	title?: string | null;
	language?: string | null;
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

export class MetaTagsRunner extends BaseRunner<
	Result,
	BaseContext,
	MetaTagsRunnerOptions
> {
	constructor(options: MetaTagsRunnerOptions) {
		super("MetaTagsRunner", options);
	}

	async transform({
		basic,
		twitter,
		openGraph,
		facebookImage,
		twitterImage,
	}: Result): Promise<MetricResult[]> {
		const seoTags = [
			basic.title && SEOMetaTagsFlags.TITLE,
			basic.description && SEOMetaTagsFlags.DESCRIPTION,
			basic.keywords && SEOMetaTagsFlags.KEYWORDS,
			basic.author && SEOMetaTagsFlags.AUTHOR,
			basic.language && SEOMetaTagsFlags.LANGUAGE,
		].filter(Boolean) as SEOMetaTagsFlags[];

		const twitterTags = [
			twitter.card && TwitterMetaTagsFlags.CARD,
			openGraph.type && TwitterMetaTagsFlags.CARD_FALLBACK,
			twitter.site && TwitterMetaTagsFlags.SITE,
			twitter.creator && TwitterMetaTagsFlags.CREATOR,
			twitter.title && TwitterMetaTagsFlags.TITLE,
			(openGraph.title || basic.title) && TwitterMetaTagsFlags.TITLE_FALLBACK,
			twitter.description && TwitterMetaTagsFlags.DESCRIPTION,
			(openGraph.description || basic.description) &&
				TwitterMetaTagsFlags.DESCRIPTION_FALLBACK,
			twitter.image && TwitterMetaTagsFlags.IMAGE,
			openGraph.image && TwitterMetaTagsFlags.IMAGE_FALLBACK,
		].filter(Boolean) as TwitterMetaTagsFlags[];

		const openGraphTags = [
			openGraph.title && OpenGraphMetaTagsFlags.TITLE,
			basic.title && OpenGraphMetaTagsFlags.TITLE_FALLBACK,
			openGraph.description && OpenGraphMetaTagsFlags.DESCRIPTION,
			openGraph.image && OpenGraphMetaTagsFlags.IMAGE,
			openGraph.url && OpenGraphMetaTagsFlags.URL,
			openGraph.type && OpenGraphMetaTagsFlags.TYPE,
			openGraph.siteName && OpenGraphMetaTagsFlags.SITE_NAME,
			openGraph.locale && OpenGraphMetaTagsFlags.LOCALE,
			basic.language && OpenGraphMetaTagsFlags.LOCALE_FALLBACK,
		].filter(Boolean) as OpenGraphMetaTagsFlags[];

		return [
			{
				id: SEOMetaTags.id,
				value: getSeoValueFromFlags(seoTags),
				additionalData: basic,
			},
			{
				id: TwitterMetaTags.id,
				value: getTwitterValueFromFlags(twitterTags),
				additionalData: twitter,
			},
			{
				id: OpenGraphMetaTags.id,
				value: getOpenGraphValueFromFlags(openGraphTags),
				additionalData: openGraph,
			},
			{
				id: FacebookPreview.id,
				value: facebookImage,
			},
			{
				id: TwitterPreview.id,
				value: twitterImage,
			},
		];
	}

	async run(context: BaseContext): Promise<MetricResult[]> {
		const res = await this.runRaw(context);

		return this.transform(res);
	}

	private async getBasicMetaTags(page: Page) {
		const res = await page.evaluate(() => {
			const title = document.title;
			const language = document.documentElement.lang;
			const description = document.querySelector("meta[name='description']");
			const keywords = document.querySelector("meta[name='keywords']");
			const author = document.querySelector("meta[name='author']");
			const viewport = document.querySelector("meta[name='viewport']");

			return {
				title,
				language,
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

	private async renderContent(page: Page, content: string) {
		await page.setContent(content);
		await page.waitForNetworkIdle({ idleTime: 1000 });
		const image = await (await page.waitForSelector("#root"))?.screenshot({
			encoding: "base64",
			omitBackground: true,
		});
		if (!image) {
			throw new Error("Failed to render preview");
		}

		return `data:image/png;base64,${image}`;
	}

	private async renderTwitterPreview(
		createPage: () => Promise<Page>,
		{ openGraph, basic, twitter, url }: { url: string } & Tags,
	) {
		const page = await createPage();
		const twitterCard = twitterTemplate({
			title: twitter?.title ?? openGraph?.title ?? basic?.title,
			description:
				twitter?.description ?? openGraph?.description ?? basic?.description,
			url_short: url.replace(/https?:\/\//, "").replace(/\/.*/, ""),
			image: twitter.image ?? openGraph?.image,
		});
		const content = await this.renderContent(page, twitterCard);
		await page.close();
		return content;
	}

	private async renderFacebookPreview(
		createPage: () => Promise<Page>,
		{
			openGraph,
			basic,
			url,
		}: { url: string } & Pick<Tags, "openGraph" | "basic">,
	) {
		const page = await createPage();
		const facebook = facebookTemplate({
			title: openGraph?.title ?? basic?.title,
			description: openGraph?.description ?? basic?.description,
			url_full: url,
			url_short: url.replace(/https?:\/\//, "").replace(/\/.*/, ""),
			image: openGraph?.image,
		});
		const content = await this.renderContent(page, facebook);
		await page.close();
		return content;
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

		const facebookImage = await this.renderFacebookPreview(
			() => browser.newPage(),
			{
				basic,
				openGraph,
				url: context.url,
			},
		);
		const twitterImage = await this.renderTwitterPreview(
			() => browser.newPage(),
			{
				basic,
				openGraph,
				twitter,
				url: context.url,
			},
		);

		try {
			return {
				basic: basic ?? {},
				openGraph: openGraph ?? {},
				twitter: twitter ?? {},
				facebookImage,
				twitterImage,
			};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
