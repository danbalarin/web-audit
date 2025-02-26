import type { Metadata } from "next";
import { SidebarLayout } from "~/features/report/components/SidebarLayout";
import { HydrateClient, trpc } from "~/server/query/server";

export const metadata: Metadata = {
	title: "Audit projects",
};

export default async ({ children }: { children: React.ReactNode }) => {
	await trpc.projects.findAll.prefetch();

	return (
		<HydrateClient>
			<SidebarLayout>{children}</SidebarLayout>
		</HydrateClient>
	);
};
