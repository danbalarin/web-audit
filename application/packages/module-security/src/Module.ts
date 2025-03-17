import { BaseModule } from "@repo/api";
import { type BaseContext, MetricResult } from "@repo/api/types";

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
	}

	protected async _execute(context: BaseContext) {
		const technologyRunner = new TechnologyRunner({});
		const sslRunner = new SSLRunner({});

		const res = [] as MetricResult[];

		try {
			const technology = await technologyRunner.run(context);
			res.push(...technology);
		} catch (e) {
			// TODO logger
			console.error("Error running Technology", e);
		}

		this.emit("progress", { progress: 0.5 });

		try {
			const ssl = await sslRunner.run(context);
			res.push(...ssl);
		} catch (e) {
			// TODO logger
			console.error("Error running SSL", e);
		}

		return {
			metrics: res,
			id: "security",
		};
	}
}
