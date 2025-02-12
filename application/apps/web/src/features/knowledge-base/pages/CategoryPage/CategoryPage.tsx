import { Metadata } from "next";
import { categoriesMap } from "~/features/report/config/metrics";

type CategoryPageParams = Promise<{
	category: string;
}>;

type CategoryPageProps = {
	params: CategoryPageParams;
};

export const generateMetadata = async ({
	params,
}: CategoryPageProps): Promise<Metadata> => {
	const { category: categoryId } = await params;
	const category = categoriesMap[categoryId];
	return {
		title: `Knowledge Base - ${category?.name}`,
		description: category?.description,
	};
};

export const CategoryPage = async ({ params }: CategoryPageProps) => {
	const { category: categoryId } = await params;
	const category = categoriesMap[categoryId];

	if (!category) {
		return <p>Category not found</p>;
	}

	const Document = category.document;

	return <Document />;
};

CategoryPage.displayName = "CategoryPage";
