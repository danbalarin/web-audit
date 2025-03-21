import { type InferInsertModel, eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { schema } from "../../schema";
import { metrics } from "./schema";

export class MetricRepository {
	constructor(private readonly client: NodePgDatabase<typeof schema>) {}

	private sanitizePayload<
		TPayload extends Partial<InferInsertModel<typeof metrics>>,
	>(payload: TPayload): Omit<TPayload, "id" | "createdAt"> {
		const keysToDelete = ["id", "createdAt"] as const;
		keysToDelete.forEach((key) => {
			if (key in payload) {
				delete payload[key];
			}
		});
		return payload;
	}

	async create(
		payload: Omit<InferInsertModel<typeof metrics>, "id" | "createdAt">,
	) {
		return await this.client
			.insert(metrics)
			.values(this.sanitizePayload(payload))
			.returning();
	}

	async findById(id: string) {
		return await this.client.query.metrics.findFirst({
			where: eq(metrics.id, id),
			with: { audit: true },
		});
	}

	async findAll() {
		return await this.client.query.metrics.findMany({
			with: { audit: true },
		});
	}

	async update(
		id: string,
		payload: Partial<
			Omit<
				InferInsertModel<typeof metrics>,
				"id" | "createdAt" | "updatedAt" | "deletedAt" | "projectId"
			>
		>,
	) {
		return await this.client
			.update(metrics)
			.set(payload)
			.where(eq(metrics.id, id))
			.returning();
	}

	async delete(id: string) {
		return await this.client
			.delete(metrics)
			.where(eq(metrics.id, id))
			.returning();
	}
}
