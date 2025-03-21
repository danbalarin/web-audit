import { BaseModule } from "@repo/api";
import { AxeRunner } from "./AxeRunner";

import type { BaseModuleOptions } from "@repo/api/types";
import pkg from "../package.json";

export type AccessibilityModuleOptions = BaseModuleOptions;

export class AccessibilityModule extends BaseModule {
	constructor(accessibilityModuleOptions: AccessibilityModuleOptions) {
		super({
			description: pkg.description,
			name: "Accessibility",
			version: pkg.version,
			id: "accessibility",
			logger: accessibilityModuleOptions.logger,
		});

		this._runners = [
			new AxeRunner({
				logger: this.logger,
			}),
		];
	}
}
