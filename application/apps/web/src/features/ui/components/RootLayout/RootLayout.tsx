import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { env } from "~/env.mjs";
import { TRPCProvider } from "~/server/query/client";

import { DialogContextProvider } from "../../contexts/DialogContext";
import { ThemeRegistry, font } from "../ThemeRegistry";
import { ToolpadProviders } from "../ToolpadProviders";

export function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{env.NEXT_PUBLIC_DEBUG && env.NODE_ENV !== "production" && (
					<script src="https://unpkg.com/react-scan/dist/auto.global.js" />
				)}
			</head>
			<body className={font.variable} suppressHydrationWarning>
				<ThemeRegistry />
				<TRPCProvider>
					{env.NEXT_PUBLIC_DEBUG && (
						<ReactQueryDevtools initialIsOpen={false} />
					)}

					<NuqsAdapter>
						<DialogContextProvider>
							<ToolpadProviders>{children}</ToolpadProviders>
						</DialogContextProvider>
					</NuqsAdapter>
				</TRPCProvider>
			</body>
		</html>
	);
}
