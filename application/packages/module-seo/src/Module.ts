import { BaseModule } from "@repo/api";
import { MetaTagsRunner } from "./MetaTagsRunner";

import type { BaseModuleOptions } from "@repo/api/types";
import pkg from "../package.json";

export type SEOModuleOptions = BaseModuleOptions;

export class SEOModule extends BaseModule {
	constructor(options: SEOModuleOptions) {
		super({
			description: pkg.description,
			name: "SEO",
			version: pkg.version,
			id: "seo",
			logger: options.logger,
		});

		this._runners = [
			new MetaTagsRunner({
				logger: options.logger,
			}),
		];
	}
}
