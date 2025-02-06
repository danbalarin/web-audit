import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TRPCProvider } from "~/server/query/client";

import { env } from "~/env.mjs";
import { ThemeRegistry, font } from "../ThemeRegistry";

export function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={font.variable} suppressHydrationWarning>
				<ThemeRegistry />
				<TRPCProvider>
					{env.NEXT_PUBLIC_DEBUG && (
						<ReactQueryDevtools initialIsOpen={false} />
					)}

					{/* <DbWorkerProvider
						electricSqlBaseUrl={env.NEXT_PUBLIC_ELECTRIC_SQL_BASE_URL}
					> */}
					{children}
					{/* </DbWorkerProvider> */}
				</TRPCProvider>
			</body>
		</html>
	);
}
