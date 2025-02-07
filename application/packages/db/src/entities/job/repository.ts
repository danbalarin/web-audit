import { InferInsertModel, and, eq, isNull } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { schema } from "../../schema";
import { orderByCreatedAt } from "../utils/orderByCreatedAt";
import { whereSoftDelete } from "../utils/whereSoftDelete";
import { jobs } from "./schema";

export class JobRepository {
	constructor(private readonly client: NodePgDatabase<typeof schema>) {}

	private sanitizePayload<
		TPayload extends Partial<InferInsertModel<typeof jobs>>,
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
			InferInsertModel<typeof jobs>,
			"id" | "createdAt" | "updatedAt" | "deletedAt"
		>,
	) {
		return (
			await this.client
				.insert(jobs)
				.values(this.sanitizePayload(payload))
				.returning()
		)[0];
	}

	async findById(id: string) {
		return await this.client.query.jobs.findFirst({
			where: and(eq(jobs.id, id), isNull(jobs.deletedAt)),
			with: {
				audits: {
					where: whereSoftDelete,
					orderBy: orderByCreatedAt,
				},
				project: true,
			},
		});
	}

	async findAll() {
		return await this.client.query.jobs.findMany({
			where: isNull(jobs.deletedAt),
			with: { audits: { where: whereSoftDelete }, project: true },
		});
	}

	async update(
		id: string,
		payload: Partial<
			Omit<
				InferInsertModel<typeof jobs>,
				"id" | "createdAt" | "updatedAt" | "deletedAt" | "projectId"
			>
		>,
	) {
		return await this.client
			.update(jobs)
			.set(payload)
			.where(eq(jobs.id, id))
			.returning();
	}

	async delete(id: string) {
		return await this.client
			.update(jobs)
			.set({ deletedAt: new Date() })
			.where(eq(jobs.id, id))
			.returning();
	}
}
