import { BaseModule } from "@repo/api";
import { MetaTagsRunner } from "./MetaTagsRunner";

import { BaseModuleOptions } from "@repo/api/types";
import pkg from "../package.json";

export type SEOModuleOptions = BaseModuleOptions;

export class SEOModule extends BaseModule {
	constructor(seoModuleOptions: SEOModuleOptions) {
		super({
			description: pkg.description,
			name: "SEO",
			version: pkg.version,
			id: "seo",
			logger: seoModuleOptions.logger,
		});

		this._runners = [
			new MetaTagsRunner({
				logger: this.logger,
			}),
		];
	}
}
