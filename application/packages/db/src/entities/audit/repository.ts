import { InferInsertModel, and, eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { schema } from "../../schema";
import { whereSoftDelete } from "../utils/whereSoftDelete";
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
		return (
			await this.client
				.insert(audits)
				.values(this.sanitizePayload(payload))
				.returning()
		)[0];
	}

	async findById(id: string) {
		return await this.client.query.audits.findFirst({
			where: and(eq(audits.id, id), whereSoftDelete(audits)),
			with: { metrics: true, job: true },
		});
	}

	async findAll() {
		return await this.client.query.audits.findMany({
			where: whereSoftDelete,
			with: { metrics: true, job: true },
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
		return (
			await this.client
				.update(audits)
				.set({ deletedAt: new Date() })
				.where(eq(audits.id, id))
				.returning()
		)[0];
	}
}
