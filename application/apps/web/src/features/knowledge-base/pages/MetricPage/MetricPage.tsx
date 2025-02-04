import { Metadata } from "next";
import { categories } from "../../config/categories";

type MetricPageParams = {
	category: string;
	metric: string;
};

type MetricPageProps = {
	params: MetricPageParams;
};

export const generateStaticParams = (): MetricPageParams[] => {
	const paths = categories
		.map((c) => c.metrics.map((m) => ({ category: c.id, metric: m.id })))
		.flat();
	return paths;
};

export const generateMetadata = ({ params }: MetricPageProps): Metadata => {
	const metric = categories
		.find((c) => c.id === params.category)
		?.metrics.find((m) => m.id === params.metric);
	return {
		title: `Knowledge Base - ${metric?.name}`,
		description: metric?.description,
	};
};

export const MetricPage = ({ params }: MetricPageProps) => {
	const metric = categories
		.find((c) => c.id === params.category)
		?.metrics.find((m) => m.id === params.metric);

	if (!metric) {
		return <p>Post not found</p>;
	}

	const Document = metric.document;
	return <Document />;
};

MetricPage.displayName = "MetricPage";
