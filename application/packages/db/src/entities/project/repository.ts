import { type InferInsertModel, and, eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { schema } from "../../schema";
import { orderByCreatedAt } from "../utils/orderByCreatedAt";
import { whereSoftDelete } from "../utils/whereSoftDelete";
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
			where: and(eq(projects.id, id), whereSoftDelete(projects)),
			orderBy: orderByCreatedAt,
			with: {
				jobs: {
					with: {
						audits: {
							with: { metrics: true },
							where: whereSoftDelete,
							orderBy: orderByCreatedAt,
						},
					},
					where: whereSoftDelete,
					orderBy: orderByCreatedAt,
				},
			},
		});
	}

	async findAll() {
		return await this.client.query.projects.findMany({
			where: whereSoftDelete,
			orderBy: orderByCreatedAt,
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
		return (
			await this.client
				.update(projects)
				.set({ deletedAt: new Date() })
				.where(eq(projects.id, id))
				.returning()
		)[0];
	}
}
