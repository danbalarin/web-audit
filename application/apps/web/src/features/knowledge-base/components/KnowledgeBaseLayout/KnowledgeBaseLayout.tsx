import type React from "react";

import { PaddedLayout } from "~/features/ui/components/PaddedLayout";

type KnowledgeBaseLayoutProps = {
	children: React.ReactNode;
};

export const KnowledgeBaseLayout = ({ children }: KnowledgeBaseLayoutProps) => {
	return (
		<PaddedLayout maxWidth="52rem" justifySelf="center">
			{children}
		</PaddedLayout>
	);
};

KnowledgeBaseLayout.displayName = "KnowledgeBaseLayout";
