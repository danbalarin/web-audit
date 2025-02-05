import { PgliteDatabase } from "drizzle-orm/pglite";
import { metrics } from "./schema";

type CreateMetricPayload = {
	auditId: string;
	value: string;
	metric: string;
	category: string;
};

export class MetricService {
	constructor(private readonly client: PgliteDatabase) {}

	async create(payload: CreateMetricPayload) {
		return await this.client.insert(metrics).values(payload).returning();
	}
}
