import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { schema } from "../../schema";
import { JobRepository } from "../job/repository";
import { AuditRepository } from "./repository";

export class AuditService {
	private readonly repository: AuditRepository;
	private readonly jobRepository: JobRepository;

	constructor(client: NodePgDatabase<typeof schema>) {
		this.repository = new AuditRepository(client);
		this.jobRepository = new JobRepository(client);
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
		return await this.repository.delete(id);
	}
}
