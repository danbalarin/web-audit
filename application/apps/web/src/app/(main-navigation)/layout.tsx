import type { Metadata } from "next";
import { SidebarLayout } from "~/features/report/components/SidebarLayout";
import { HydrateClient, trpc } from "~/server/query/server";

export const metadata: Metadata = {
	title: "Audit projects",
};

export default ({ children }: { children: React.ReactNode }) => {
	void trpc.projects.findAll.prefetch();

	return (
		<HydrateClient>
			<SidebarLayout>{children}</SidebarLayout>
		</HydrateClient>
	);
};
