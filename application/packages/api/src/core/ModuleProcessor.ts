import type { AuditService, Job, JobService, MetricService } from "@repo/db";

import type { Logger, ModuleStatus } from "../types";
import type { BaseContext } from "../types/Context";
import type { BaseModule, ModuleResult } from "./Module";

type Step = "ready" | "processing" | "saving" | "done";

export type ModuleProcessorResult = {
	url: string;
	categories: ModuleResult[];
};

export type ModuleProcessorOptions = {
	jobService: JobService;
	metricService: MetricService;
	auditService: AuditService;
	modules: BaseModule[];
	logger: Logger;
	projectId: string;
};

export class ModuleProcessor {
	private _auditService: AuditService;
	private _metricService: MetricService;
	private _jobService: JobService;
	private _currentStep: Step = "ready";
	private _modules: BaseModule[] = [];
	private _logger: Logger;
	private _projectId: string;
	private _job: Job | undefined = undefined;

	constructor(options: ModuleProcessorOptions) {
		this._jobService = options.jobService;
		this._auditService = options.auditService;
		this._metricService = options.metricService;
		this._modules = options.modules;
		this._logger = options.logger;
		this._projectId = options.projectId;
	}

	private async progress(progress: number) {
		if (!this._job) {
			return;
		}
		await this._jobService.setProgress(this._job.id, progress);
	}

	private async updateModuleStatus(
		moduleId: string,
		status: Partial<ModuleStatus>,
	) {
		if (!this._job) {
			return;
		}
		await this._jobService.updateModuleStatuses(this._job.id, {
			[moduleId]: status,
		});
	}

	public async process<TContext extends BaseContext = BaseContext>(
		context: TContext,
	) {
		if (this._currentStep !== "ready") {
			throw new Error("Processor is already running");
		}
		this._job = await this._jobService.create({ projectId: this._projectId });
		if (!this._job) {
			throw new Error("Failed to create job");
		}
		this.processAsync(context);
		return this._job.id;
	}

	private async saveAuditResult(result: ModuleProcessorResult) {
		this._currentStep = "saving";

		if (!this._job) {
			throw new Error("Job not found");
		}
		const audit = await this._auditService.create({
			jobId: this._job?.id,
			url: result.url,
		});

		if (!audit) {
			throw new Error("Failed to create audit");
		}

		const promises = [];

		for (const category of result.categories) {
			for (const metric of category.metrics) {
				promises.push(
					this._metricService.create({
						auditId: audit.id,
						category: category.id,
						metric: metric.id,
						value: `${metric.value}`,
						additionalData: metric.additionalData,
					}),
				);
			}
		}

		await Promise.all(promises);

		return audit.id;
	}

	private async processAsync<TContext extends BaseContext = BaseContext>(
		context: TContext,
	): Promise<string> {
		if (!this._job) {
			throw new Error("Job not found");
		}

		this.logger.debug("processing modules");
		this._currentStep = "processing";

		await this.progress(0);

		const result: ModuleProcessorResult = {
			categories: [],
			url: context.url,
		};

		let completed = 0;

		for (const module of Object.values(this._modules)) {
			this.updateModuleStatus(module.id, {
				progress: 0.01,
				status: "processing",
			});

			const unsubscribeProgress = module.on("progress", (payload) => {
				this.progress(
					completed / this._modules.length +
						payload.progress / this._modules.length,
				);
				this.updateModuleStatus(module.id, { progress: payload.progress });
			});

			const unsubscribeError = module.on("error", (payload) => {
				this.logger.error("Error executing module", payload.error);
				this.updateModuleStatus(module.id, {
					progress: 1,
					status: "error",
					additionalData: payload.error,
				});
			});

			const unsubscribeComplete = module.on("complete", (payload) => {
				completed++;
				this.progress(completed / this._modules.length);
				this.updateModuleStatus(module.id, { progress: 1, status: "complete" });

				result.categories.push(payload.data);
			});

			await module
				.execute(context)
				.finally(() => {
					unsubscribeProgress();
					unsubscribeError();
					unsubscribeComplete();
				})
				.catch((e) => {
					this.logger.error("Error executing module", e);
					this.updateModuleStatus(module.id, {
						progress: 1,
						status: "error",
						additionalData: e,
					});
				});
		}

		const auditId = await this.saveAuditResult(result);

		// Await for the result to be retrievable, prevents race conditions
		await new Promise<void>((resolve) => setTimeout(resolve, 1000));

		this._currentStep = "done";

		this.progress(1);

		return auditId;
	}

	protected get logger() {
		return this._logger;
	}
}
