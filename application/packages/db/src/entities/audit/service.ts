import { eq } from "drizzle-orm";
import { PgliteDatabase } from "drizzle-orm/pglite";
import { audits } from "./schema";

type CreateAuditPayload = {
	projectId: string;
	url: string;
};

export class AuditService {
	constructor(private readonly client: PgliteDatabase) {}

	async create(payload: CreateAuditPayload) {
		return await this.client.insert(audits).values(payload).returning();
	}

	async getAuditById(id: string) {
		return await this.client.select().from(audits).where(eq(audits.id, id));
	}
}
