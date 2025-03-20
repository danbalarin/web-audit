import { BaseRunner } from "@repo/api";
import { BaseContext, MetricResult } from "@repo/api/types";
import { clean, gte, lt } from "semver";
/// <reference path="../../types/wappalyzer-core.d.ts" />
import Wappalyzer from "wappalyzer-core";

import repo from "../assets/retire-repo.json";
import Driver from "./lib/wappalyzer/driver";
import { categories, technologies } from "./lib/wappalyzer/technologies";
import { DetectedTechnologies } from "./metrics/detected-technologies";
import { VulnerableDependencies } from "./metrics/vulnerable-dependencies";

// biome-ignore lint/complexity/noBannedTypes: placeholder
export type TechnologyRunnerOptions = {};

export type TechnologyRunnerResult = {
	technology: Technology;
	vulnerabilities: Vulnerability[];
}[];

type Technology = {
	slug: string;
	name: string;
	description: string;
	confidence: number;
	version: string;
	icon: string;
	website: string;
	cpe: string;
	categories: { id: number; slug: string; name: string }[];
};

type Vulnerability = {
	below: string;
	atOrAbove?: string;
	severity: string;
	cwe: string[];
	identifiers: {
		summary?: string;
		CVE?: string[];
		githubID?: string;
	};
	info: string[];
};

type SimpleRepo = {
	[name: string]: {
		vulnerabilities: Vulnerability[];
	};
};

export class TechnologyRunner extends BaseRunner {
	private readonly _options: Required<TechnologyRunnerOptions>;

	constructor(_options: TechnologyRunnerOptions) {
		super("TechnologyRunner");

		this._options = Object.assign({}, _options);
	}
	async transform(result: TechnologyRunnerResult): Promise<MetricResult[]> {
		// await writeFile("retire-results.json", JSON.stringify(result, null, 2));
		const vulnerableComponents = result.filter(
			(c) => c.vulnerabilities?.length && c.vulnerabilities?.length > 0,
		);

		return [
			{
				id: VulnerableDependencies.id,
				value: vulnerableComponents.length,
				additionalData: vulnerableComponents,
			},
			{
				id: DetectedTechnologies.id,
				value: result.length,
				additionalData: result.map((c) => c.technology),
			},
		];
	}

	async run(context: BaseContext): Promise<MetricResult[]> {
		const res = await this.runRaw(context);

		return this.transform(res);
	}

	async getTechnologies(context: BaseContext): Promise<Technology[]> {
		Wappalyzer.setCategories(categories);
		Wappalyzer.setTechnologies(technologies);

		const browser = await context.createBrowser();
		const driver = new Driver({ browser });
		const site = await driver.open(context.url);
		let error = null;
		site.on("error", (err: unknown) => {
			error = err;
		});

		const results = await site.analyze();

		if (error) {
			throw error;
		}

		return results.technologies;
	}

	async checkForVulnerabilities(
		technologies: Technology[],
	): Promise<TechnologyRunnerResult> {
		const repository = repo as SimpleRepo;
		const components = [];

		for (const technology of technologies) {
			const { slug, version } = technology;
			const technologyVulnerabilities = repository[slug];
			const foundVulnerabilities = [];

			if (!technologyVulnerabilities) {
				components.push({
					technology,
					vulnerabilities: [],
				});
				continue;
			}

			const { vulnerabilities } = technologyVulnerabilities;

			for (const vulnerability of vulnerabilities) {
				if (clean(vulnerability.below) === null) {
					continue;
				}
				const upperBound = lt(version, vulnerability.below);
				const lowerBound =
					vulnerability.atOrAbove &&
					clean(vulnerability.atOrAbove) &&
					gte(version, vulnerability.atOrAbove);
				const isVulnerable =
					lowerBound !== undefined ? lowerBound && upperBound : upperBound;

				if (isVulnerable) {
					foundVulnerabilities.push(vulnerability);
				}
			}
			components.push({
				technology,
				vulnerabilities: foundVulnerabilities,
			});
		}

		return components;
	}

	async runRaw(context: BaseContext): Promise<TechnologyRunnerResult> {
		const foundTechs = await this.getTechnologies(context);
		const vulnerableComponents = await this.checkForVulnerabilities(foundTechs);
		return vulnerableComponents;
	}
}
