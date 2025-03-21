import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { schema } from "../../schema";
import { AuditRepository } from "../audit/repository";
import { MetricRepository } from "./repository";

export class MetricService {
	private readonly repository: MetricRepository;
	private readonly auditRepository: AuditRepository;

	constructor(client: NodePgDatabase<typeof schema>) {
		this.repository = new MetricRepository(client);
		this.auditRepository = new AuditRepository(client);
	}

	async create(payload: Parameters<MetricRepository["create"]>[0]) {
		if (!(await this.auditRepository.findById(payload.auditId))) {
			throw new Error("Audit not found");
		}
		return await this.repository.create(payload);
	}

	async findById(id: string) {
		return await this.repository.findById(id);
	}

	async findAll() {
		return await this.repository.findAll();
	}

	async update(id: string, payload: Parameters<MetricRepository["update"]>[1]) {
		return await this.repository.update(id, payload);
	}

	async delete(id: string) {
		return await this.repository.delete(id);
	}
}
