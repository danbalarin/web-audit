import { BaseModule } from "@repo/api";

import pkg from "../package.json";
import { SSLRunner } from "./SSLRunner";
import { TechnologyRunner } from "./TechnologyRunner";

export type SecurityModuleOptions = object;

export class SecurityModule extends BaseModule {
	constructor(private readonly _securityModuleOptions: SecurityModuleOptions) {
		super({
			description: pkg.description,
			name: "Security",
			version: pkg.version,
			id: "security",
		});

		this._runners = [new SSLRunner({}), new TechnologyRunner({})];
	}
}
