import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { schema } from "../../schema";
import { ProjectRepository } from "../project/repository";
import { AuditRepository } from "./repository";

export class AuditService {
	private readonly repository: AuditRepository;
	private readonly projectRepository: ProjectRepository;

	constructor(client: NodePgDatabase<typeof schema>) {
		this.repository = new AuditRepository(client);
		this.projectRepository = new ProjectRepository(client);
	}

	async create(payload: Parameters<AuditRepository["create"]>[0]) {
		if (!(await this.projectRepository.findById(payload.projectId))) {
			throw new Error("Project not found");
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
