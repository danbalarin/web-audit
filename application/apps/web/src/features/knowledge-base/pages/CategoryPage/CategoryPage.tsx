import { Metadata } from "next";
import { categories } from "../../config/categories";

type CategoryPageParams = {
	category: string;
};

type CategoryPageProps = {
	params: CategoryPageParams;
};

export const generateMetadata = ({ params }: CategoryPageProps): Metadata => {
	const category = categories.find((c) => c.id === params.category);
	return {
		title: `Knowledge Base - ${category?.name}`,
		description: category?.description,
	};
};

export const CategoryPage = ({ params }: CategoryPageProps) => {
	const category = categories.find((c) => c.id === params.category);

	if (!category) {
		return <p>Category not found</p>;
	}

	const Document = category.document;

	return <Document />;
};

CategoryPage.displayName = "CategoryPage";
