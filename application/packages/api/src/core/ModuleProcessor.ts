import { AuditService, Job, JobService, MetricService } from "@repo/db";

import type { AuditResult } from "../types/AuditResult";
import type { BaseContext } from "../types/Context";
import { Logger } from "../types/Logger";
import type { BaseModule } from "./Module";

type Step = "ready" | "processing" | "saving" | "done";

export type ModuleProcessorMeta = {
	step: Step;
	progress: number;
};

export type ModuleProcessorState = {
	id: string;
	meta: ModuleProcessorMeta;
	result: AuditResult;
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

	private async saveAuditResult(result: AuditResult) {
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

		this._logger.trace("processing modules");
		this._currentStep = "processing";

		await this.progress(0);

		const result: AuditResult = {
			categories: [],
			jobId: this._job?.id,
			url: context.url,
		};

		let completed = 0;
		const promises = [];
		for (const module of Object.values(this._modules)) {
			const moduleLogger = this._logger.child({
				moduleId: module.id,
			});
			module.on("progress", (payload) => {
				moduleLogger.trace({ progress: payload.progress }, "progress");
				this.progress(
					completed / this._modules.length +
						payload.progress / this._modules.length,
				);
			});

			module.on("error", (payload) => {
				moduleLogger.error({ error: payload.error }, "error");
			});

			module.on("complete", (payload) => {
				moduleLogger.trace("complete");
				completed++;
				this.progress(completed / this._modules.length);
				result.categories.push(payload.data);
			});

			promises.push(module.execute(context));
		}

		await Promise.all(promises);

		const auditId = await this.saveAuditResult(result);

		this._currentStep = "done";

		this.progress(1);

		return auditId;
	}
}
