import { asc } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

export const orderByCreatedAt = <TEntity extends { createdAt: PgColumn }>(
	entity: TEntity,
) => [asc(entity.createdAt)];
