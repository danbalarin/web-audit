import { BaseModule } from "@repo/api";

import type { BaseModuleOptions } from "@repo/api/types";
import pkg from "../package.json";
import { ObservatoryRunner } from "./ObservatoryRunner";
import { SSLRunner } from "./SSLRunner";
import { TechnologyRunner } from "./TechnologyRunner";

export type SecurityModuleOptions = BaseModuleOptions;

export class SecurityModule extends BaseModule {
	constructor(options: SecurityModuleOptions) {
		super({
			description: pkg.description,
			name: "Security",
			version: pkg.version,
			id: "security",
			logger: options.logger,
		});

		this._runners = [
			new SSLRunner({
				logger: options.logger,
			}),
			new TechnologyRunner({
				logger: options.logger,
			}),
			new ObservatoryRunner({
				logger: options.logger,
			}),
		];
	}
}
