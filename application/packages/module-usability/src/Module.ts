import { BaseModule } from "@repo/api";
import type { BaseModuleOptions } from "@repo/api/types";

import pkg from "../package.json";
import { ErrorPageRunner } from "./ErrorPageRunner";

export type UsabilityModuleOptions = BaseModuleOptions;

export class UsabilityModule extends BaseModule {
	constructor(options: UsabilityModuleOptions) {
		super({
			description: pkg.description,
			name: "Usability",
			version: pkg.version,
			id: "usability",
			logger: options.logger,
		});

		this._runners = [
			new ErrorPageRunner({
				logger: options.logger,
			}),
		];
	}
}
