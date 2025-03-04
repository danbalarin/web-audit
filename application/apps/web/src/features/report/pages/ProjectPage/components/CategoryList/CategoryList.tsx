"use client";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

import {
	categoriesMap,
	scoreAndSplitMetrics,
} from "~/features/report/config/metrics";
import { trpc } from "~/server/query/client";

import { Card, Typography } from "@mui/material";
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
				auditId: audit.id,
				...scoreAndSplitMetrics(audit.metrics),
			})),
		[audits],
	);

	if (!data.length) {
		return (
			<Card sx={{ p: 2 }}>
				<Typography variant="body1">
					To see details please select audits in the table above using the
					checkbox under the{" "}
					<CompareArrowsIcon
						fontSize="medium"
						color="primary"
						sx={{ verticalAlign: "text-bottom" }}
					/>{" "}
					icon.
				</Typography>
			</Card>
		);
	}

	return Object.values(categoriesMap).map((cat) => (
		<CategoryCard
			category={cat}
			key={cat.id}
			metricScores={data}
			audits={audits}
		/>
	));
};

CategoryList.displayName = "CategoryList";
