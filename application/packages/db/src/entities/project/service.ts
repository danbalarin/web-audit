import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { schema } from "../../schema";
import { ProjectRepository } from "./repository";

export class ProjectService {
	private readonly repository: ProjectRepository;
	constructor(client: NodePgDatabase<typeof schema>) {
		this.repository = new ProjectRepository(client);
	}

	async create(payload: Parameters<ProjectRepository["create"]>[0]) {
		return await this.repository.create(payload);
	}

	async findById(id: string) {
		return await this.repository.findById(id);
	}

	async findAll() {
		return await this.repository.findAll();
	}

	async update(
		id: string,
		payload: Parameters<ProjectRepository["update"]>[1],
	) {
		return await this.repository.update(id, payload);
	}

	async delete(id: string) {
		return await this.repository.delete(id);
	}
}
