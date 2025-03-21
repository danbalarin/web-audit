import { isNull } from "drizzle-orm";
import type { PgColumn } from "drizzle-orm/pg-core";

export const whereSoftDelete = <TEntity extends { deletedAt: PgColumn }>(
	entity: TEntity,
) => isNull(entity.deletedAt);
