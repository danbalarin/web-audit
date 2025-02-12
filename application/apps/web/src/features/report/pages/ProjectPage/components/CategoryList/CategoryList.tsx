"use client";
import { useQueryState } from "nuqs";

import { categories } from "~/features/knowledge-base/config/categories";
import { trpc } from "~/server/query/client";

import { useMemo } from "react";
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
	const _audits = useMemo(
		() =>
			project.jobs
				.flatMap((job) => job.audits)
				.filter((a) => selectedAudits.includes(a.id)),
		[project.jobs, selectedAudits],
	);
	return categories.map((cat) => <CategoryCard category={cat} key={cat.id} />);
};

CategoryList.displayName = "CategoryList";
