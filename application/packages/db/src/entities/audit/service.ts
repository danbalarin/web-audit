import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { schema } from "../../schema";
import { JobRepository } from "../job/repository";
import { ProjectRepository } from "../project/repository";
import { AuditRepository } from "./repository";

export class AuditService {
	private readonly repository: AuditRepository;
	private readonly jobRepository: JobRepository;
	private readonly projectRepository: ProjectRepository;

	constructor(client: NodePgDatabase<typeof schema>) {
		this.repository = new AuditRepository(client);
		this.jobRepository = new JobRepository(client);
		this.projectRepository = new ProjectRepository(client);
	}

	async create(payload: Parameters<AuditRepository["create"]>[0]) {
		if (!(await this.jobRepository.findById(payload.jobId))) {
			throw new Error("Job not found");
		}
		return await this.repository.create(payload);
	}

	async findById(id: string) {
		return await this.repository.findById(id);
	}

	async findAll() {
		return await this.repository.findAll();
	}

	async update(id: string, payload: Parameters<AuditRepository["update"]>[1]) {
		return await this.repository.update(id, payload);
	}

	async delete(id: string) {
		const deletedAudit = await this.repository.delete(id);
		if (!deletedAudit) {
			throw new Error("Audit not found");
		}

		const job = (await this.jobRepository.findById(deletedAudit.jobId))!;
		const projectId = job.project.id;
		if (job?.audits.length === 0) {
			await this.jobRepository.delete(deletedAudit.jobId);
		}

		const project = await this.projectRepository.findById(projectId);

		return { ...deletedAudit, project };
	}
}
