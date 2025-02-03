"use client";

import { GetStaticPaths } from "next";
import { useParams } from "next/navigation";
import { categories } from "~/features/knowledge-base/config/categories";

export const getStaticPaths = (async () => {
	const paths = categories
		.map((c) =>
			c.metrics.map((m) => ({ params: { category: c.id, metric: m.id } })),
		)
		.flat();
	return {
		paths,
		fallback: false,
	};
}) satisfies GetStaticPaths;

export default function Page() {
	const params = useParams();
	return <p>Post: {JSON.stringify(params, null, 2)}</p>;
}
