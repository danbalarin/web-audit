import { BaseModule } from "@repo/api";
import { type BaseContext, MetricResult } from "@repo/api/types";
import { AxeRunner } from "./AxeRunner";

import pkg from "../package.json";

export type AccessibilityModuleOptions = object;

export class AccessibilityModule extends BaseModule {
	constructor(
		private readonly _accessibilityModuleOptions: AccessibilityModuleOptions,
	) {
		super({
			description: pkg.description,
			name: "Accessibility",
			version: pkg.version,
			id: "accessibility",
		});
	}

	protected async _execute(context: BaseContext) {
		const axeRunner = new AxeRunner({});

		const res = [] as MetricResult[];

		// this.emit("progress", { progress: 0.5 });

		try {
			const axe = await axeRunner.run(context);
			res.push(...axe);
		} catch (e) {
			// TODO logger
			console.error("Error running Axe", e);
		}

		return {
			metrics: res,
			id: "accessibility",
		};
	}
}
