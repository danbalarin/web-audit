"use client";
import { Box, List } from "@mui/material";
import { useParams } from "next/navigation";
import React, { Fragment } from "react";

import { categoriesMap } from "~/features/report/config/metrics";
import { PaddedLayout } from "~/features/ui/components/PaddedLayout";

import { CategoryListItem } from "../CategoryListItem";
import { MetricListItem } from "../MetricListItem";

type KnowledgeBaseLayoutProps = {
	children: React.ReactNode;
};

export const KnowledgeBaseLayout = ({ children }: KnowledgeBaseLayoutProps) => {
	const { category, metric } = useParams();

	return (
		<Box sx={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
			<Box component="nav" sx={{ width: "15em", flexShrink: 0 }}>
				<List
					disablePadding
					sx={{
						width: "15em",
						flexShrink: 0,
						height: "100%",
						position: "fixed",
						flex: "0 0 auto",
						borderRight: `1px solid`,
						borderColor: "var(--mui-palette-divider)",
					}}
				>
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
			</Box>
			<PaddedLayout maxWidth="52rem" justifySelf="center">
				{children}
			</PaddedLayout>
		</Box>
	);
};

KnowledgeBaseLayout.displayName = "KnowledgeBaseLayout";
