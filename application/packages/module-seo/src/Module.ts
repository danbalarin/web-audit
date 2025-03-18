import { BaseModule } from "@repo/api";
import { MetaTagsRunner } from "./MetaTagsRunner";

import pkg from "../package.json";

export type SEOModuleOptions = object;

export class SEOModule extends BaseModule {
	constructor(private readonly _sEOModuleOptions: SEOModuleOptions) {
		super({
			description: pkg.description,
			name: "SEO",
			version: pkg.version,
			id: "seo",
		});

		this._runners = [new MetaTagsRunner({})];
	}
}
