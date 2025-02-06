import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { schema } from "../../schema";
import { ProjectRepository } from "../project/repository";
import { JobRepository } from "./repository";

export class JobService {
	private readonly repository: JobRepository;
	private readonly projectRepository: ProjectRepository;

	constructor(client: NodePgDatabase<typeof schema>) {
		this.repository = new JobRepository(client);
		this.projectRepository = new ProjectRepository(client);
	}

	async create(payload: Parameters<JobRepository["create"]>[0]) {
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

	async update(id: string, payload: Parameters<JobRepository["update"]>[1]) {
		return await this.repository.update(id, payload);
	}

	async delete(id: string) {
		return await this.repository.delete(id);
	}
}
