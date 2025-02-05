import { InferInsertModel, and, eq, isNull } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { schema } from "../../schema";
import { audits } from "./schema";

export class AuditRepository {
	constructor(private readonly client: NodePgDatabase<typeof schema>) {}

	private sanitizePayload<
		TPayload extends Partial<InferInsertModel<typeof audits>>,
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
			InferInsertModel<typeof audits>,
			"id" | "createdAt" | "updatedAt" | "deletedAt"
		>,
	) {
		return await this.client
			.insert(audits)
			.values(this.sanitizePayload(payload))
			.returning();
	}

	async findById(id: string) {
		return await this.client.query.audits.findFirst({
			where: and(eq(audits.id, id), isNull(audits.deletedAt)),
			with: { metrics: true, project: true },
		});
	}

	async findAll() {
		return await this.client.query.audits.findMany({
			where: isNull(audits.deletedAt),
			with: { metrics: true, project: true },
		});
	}

	async update(
		id: string,
		payload: Partial<
			Omit<
				InferInsertModel<typeof audits>,
				"id" | "createdAt" | "updatedAt" | "deletedAt" | "projectId"
			>
		>,
	) {
		return await this.client
			.update(audits)
			.set(payload)
			.where(eq(audits.id, id))
			.returning();
	}

	async delete(id: string) {
		return await this.client
			.update(audits)
			.set({ deletedAt: new Date() })
			.where(eq(audits.id, id))
			.returning();
	}
}
