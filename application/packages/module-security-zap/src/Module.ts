import { BaseModule } from "@repo/api";
import { type BaseContext, MetricResult } from "@repo/api/types";
import { ZapRunner } from "./ZapRunner";

import pkg from "../package.json";

export type SecurityModuleOptions = {
	zapApiUrl: string;
};

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
		const zapRunner = new ZapRunner({
			url: this._securityModuleOptions.zapApiUrl,
		});

		const res = [] as MetricResult[];

		try {
			const zap = await zapRunner.run(context);
			res.push(...zap);
		} catch (e) {
			// TODO logger
			console.error("Error running zap", e);
		}

		return {
			metrics: res,
			id: "security",
		};
	}
}
