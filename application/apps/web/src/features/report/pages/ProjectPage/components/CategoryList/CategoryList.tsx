"use client";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

import {
	categoriesMap,
	scoreAndSplitMetrics,
} from "~/features/report/config/metrics";
import { trpc } from "~/server/query/client";

import { AUDIT_SEARCH_PARAMS, auditsSearchParams } from "../../searchParams";
import { CategoryCard } from "../CategoryCard";

type CategoryListProps = {
	projectId: string;
};

export const CategoryList = ({ projectId }: CategoryListProps) => {
	const [project] = trpc.projects.findById.useSuspenseQuery({ id: projectId });
	const [selectedAudits] = useQueryState(
		AUDIT_SEARCH_PARAMS,
		auditsSearchParams[AUDIT_SEARCH_PARAMS],
	);
	const audits = useMemo(
		() =>
			project.jobs
				.flatMap((job) => job.audits)
				.filter((a) => selectedAudits.includes(a.id)),
		[project.jobs, selectedAudits],
	);

	const data = useMemo(
		() =>
			audits.map((audit) => ({
				...audit,
				...scoreAndSplitMetrics(audit.metrics),
			})),
		[audits],
	);

	return Object.values(categoriesMap).map((cat) => (
		<CategoryCard category={cat} key={cat.id} data={data} />
	));
};

CategoryList.displayName = "CategoryList";
