import { Metadata } from "next";
import { categories } from "../../config/categories";

type MetricPageParams = Promise<{
	category: string;
	metric: string;
}>;

type MetricPageProps = {
	params: MetricPageParams;
};

export const generateStaticParams = async (): Promise<
	Awaited<MetricPageParams>[]
> => {
	const paths = categories
		.map((c) => c.metrics.map((m) => ({ category: c.id, metric: m.id })))
		.flat();
	return paths;
};

export const generateMetadata = async ({
	params,
}: MetricPageProps): Promise<Metadata> => {
	const { category: categoryId, metric: metricId } = await params;
	const metric = categories
		.find((c) => c.id === categoryId)
		?.metrics.find((m) => m.id === metricId);
	return {
		title: `Knowledge Base - ${metric?.name}`,
		description: metric?.description,
	};
};

export const MetricPage = async ({ params }: MetricPageProps) => {
	const { category: categoryId, metric: metricId } = await params;
	const metric = categories
		.find((c) => c.id === categoryId)
		?.metrics.find((m) => m.id === metricId);

	if (!metric) {
		return <p>Post not found</p>;
	}

	const Document = metric.document;
	return <Document />;
};

MetricPage.displayName = "MetricPage";
