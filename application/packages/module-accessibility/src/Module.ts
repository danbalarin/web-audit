import { BaseModule } from "@repo/api";
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

		this._runners = [new AxeRunner({})];
	}
}
