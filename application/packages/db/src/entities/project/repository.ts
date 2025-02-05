import { InferInsertModel, and, eq, isNull } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { schema } from "../../schema";
import { projects } from "./schema";

export class ProjectRepository {
	constructor(private readonly client: NodePgDatabase<typeof schema>) {}

	private sanitizePayload<
		TPayload extends Partial<InferInsertModel<typeof projects>>,
	>(
		payload: TPayload,
	): Omit<TPayload, "id" | "createdAt" | "updatedAt" | "deletedAt"> {
		const keysToDelete = ["id", "createdAt", "updatedAt", "deletedAt"] as const;
		keysToDelete.forEach((key) => {
			if (key in payload) {
				delete payload[key];
			}
		});
		return payload;
	}

	async create(
		payload: Omit<
			InferInsertModel<typeof projects>,
			"id" | "createdAt" | "updatedAt" | "deletedAt"
		>,
	) {
		return await this.client
			.insert(projects)
			.values(this.sanitizePayload(payload))
			.returning();
	}

	async findById(id: string) {
		return await this.client.query.projects.findFirst({
			where: and(eq(projects.id, id), isNull(projects.deletedAt)),
			with: { audits: { with: { metrics: true } } },
		});
	}

	async findAll() {
		return await this.client.query.projects.findMany({
			where: isNull(projects.deletedAt),
			with: { audits: { with: { metrics: true } } },
		});
	}

	async update(
		id: string,
		payload: Partial<
			Omit<
				InferInsertModel<typeof projects>,
				"id" | "createdAt" | "updatedAt" | "deletedAt"
			>
		>,
	) {
		return await this.client
			.update(projects)
			.set(payload)
			.where(eq(projects.id, id))
			.returning();
	}

	async delete(id: string) {
		return await this.client
			.update(projects)
			.set({ deletedAt: new Date() })
			.where(eq(projects.id, id))
			.returning();
	}
}
