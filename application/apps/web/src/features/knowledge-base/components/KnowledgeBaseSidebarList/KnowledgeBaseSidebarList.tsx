"use client";
import { List } from "@mui/material";
import { useParams } from "next/navigation";
import { Fragment } from "react";

import { categoriesMap } from "~/features/report/config/metrics";
import { CategoryListItem } from "../CategoryListItem";
import { MetricListItem } from "../MetricListItem";

export const KnowledgeBaseSidebarList = () => {
	const { category, metric } = useParams();

	return (
		<List disablePadding>
			{Object.values(categoriesMap).map((c) => (
				<Fragment key={c.id}>
					<CategoryListItem category={c} selected={c.id === category} />
					<List dense disablePadding>
						{c.metrics.map((m) => (
							<MetricListItem
								categoryId={c.id}
								metric={m}
								key={m.id}
								selected={m.id === metric}
							/>
						))}
					</List>
				</Fragment>
			))}
		</List>
	);
};

KnowledgeBaseSidebarList.displayName = "KnowledgeBaseSidebarList";
