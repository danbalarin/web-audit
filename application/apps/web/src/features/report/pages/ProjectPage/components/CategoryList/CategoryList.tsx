"use client";
import { categories } from "~/features/knowledge-base/config/categories";
import { trpc } from "~/server/query/client";
import { CategoryCard } from "../CategoryCard";

type CategoryListProps = {
	projectId: string;
};

export const CategoryList = ({ projectId }: CategoryListProps) => {
	const [_project] = trpc.projects.findById.useSuspenseQuery({ id: projectId });

	return categories.map((cat) => <CategoryCard category={cat} key={cat.id} />);
};

CategoryList.displayName = "CategoryList";
