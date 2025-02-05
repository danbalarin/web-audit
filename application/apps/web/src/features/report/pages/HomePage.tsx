"use client";
import { usePGlite } from "@electric-sql/pglite-react";
import { Repl } from "@electric-sql/pglite-repl";

export function HomePage() {
	const pg = usePGlite();

	return (
		<div>
			<Repl pg={pg} />
		</div>
	);
}
