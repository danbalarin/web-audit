import type { Metadata } from "next";
import { SidebarLayout } from "~/features/report/components/SidebarLayout";

export const metadata: Metadata = {
	title: "Audit projects",
};

export default async ({ children }: { children: React.ReactNode }) => {
	return <SidebarLayout>{children}</SidebarLayout>;
};
