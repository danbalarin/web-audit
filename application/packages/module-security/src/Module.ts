import { BaseModule } from "@repo/api";

import { BaseModuleOptions } from "@repo/api/types";
import pkg from "../package.json";
import { ObservatoryRunner } from "./ObservatoryRunner";
import { SSLRunner } from "./SSLRunner";
import { TechnologyRunner } from "./TechnologyRunner";

export type SecurityModuleOptions = BaseModuleOptions;

export class SecurityModule extends BaseModule {
	constructor(securityModuleOptions: SecurityModuleOptions) {
		super({
			description: pkg.description,
			name: "Security",
			version: pkg.version,
			id: "security",
			logger: securityModuleOptions.logger,
		});

		this._runners = [
			new SSLRunner({
				logger: this.logger,
			}),
			new TechnologyRunner({
				logger: this.logger,
			}),
			new ObservatoryRunner({
				logger: this.logger,
			}),
		];
	}
}
