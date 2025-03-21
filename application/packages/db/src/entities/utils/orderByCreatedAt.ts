import { asc } from "drizzle-orm";
import type { PgColumn } from "drizzle-orm/pg-core";

export const orderByCreatedAt = <TEntity extends { createdAt: PgColumn }>(
	entity: TEntity,
) => [asc(entity.createdAt)];
