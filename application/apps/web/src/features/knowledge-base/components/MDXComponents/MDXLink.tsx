import React from "react";

import { Link } from "@mui/material";
import { CategoryKeys, categoriesMap } from "~/features/report/config/metrics";
import { KnowledgeLink } from "../KnowledgeLink";

type LinkProps = {
	href?: string;
	children?: React.ReactNode;
};

// category:category-id
// category:category-id,metric:metric-id

// const getHref = (href: string) => {
// 	const match = href.match(regex);
// 	console.log(match);
// 	if (match) {
// 		const categoryId = match[1];
// 		const metricId = match[3];
// 		const category = categories.find((c) => c.id === categoryId);
// 		const metric = category?.metrics.find((m) => m.id === metricId);
// 		if (!category || (metricId && !metric)) {
// 			return { href, tooltip: null };
// 		}
// 		if (metric) {
// 			return {
// 				href: KNOWLEDGE_BASE_ROUTES.METRIC(category.id, metric.id),
// 				tooltip: metric.description,
// 			};
// 		}
// 		return {
// 			href: KNOWLEDGE_BASE_ROUTES.CATEGORY(category.id),
// 			tooltip: category.description,
// 		};
// 	}
// 	return { href, tooltip: null };
// };

const getCategoryAndMetric = (href: string) => {
	const regex = /category:([a-zA-Z0-9-]+)(,metric:([a-zA-Z0-9-]+))?/;
	const match = href.match(regex);
	if (match) {
		const categoryId = match[1] as CategoryKeys | undefined;
		const metricId = match[3];
		if (!categoryId) {
			return { category: null, metric: null };
		}
		const category = categoriesMap[categoryId];
		const metric = category?.metrics.find((m) => m.id === metricId);
		return { category, metric };
	}
	return { category: null, metric: null };
};

export const MDXLink = ({ href, children }: LinkProps) => {
	const { category, metric } = getCategoryAndMetric(href ?? "");
	if (!category) {
		return (
			<Link href={href} sx={{ textDecorationStyle: "dotted" }} target="_blank">
				{children}
			</Link>
		);
	}

	return (
		<KnowledgeLink categoryId={category.id} metricId={metric?.id}>
			{children}
		</KnowledgeLink>
	);
};

MDXLink.displayName = "MDXLink";
