import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { schema } from "../../schema";
import { projects } from "./schema";

type CreateProjectPayload = {
	name: string;
	homeUrl: string;
	urls: string[];
};

export class ProjectService {
	constructor(private readonly client: NodePgDatabase<typeof schema>) {}

	async create(payload: CreateProjectPayload) {
		return await this.client.insert(projects).values(payload).returning();
	}

	async getAll() {
		return await this.client.query.projects.findMany({
			columns: { deletedAt: false },
		});
	}

	async getById(id: string) {
		return await this.client.select().from(projects).where(eq(projects.id, id));
	}
}
