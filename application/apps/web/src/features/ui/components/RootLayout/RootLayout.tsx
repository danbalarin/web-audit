import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TRPCProvider } from "~/server/query/client";

import { ThemeRegistry, font } from "../ThemeRegistry";

export function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={font.variable}>
				<ThemeRegistry />
				<TRPCProvider>
					<ReactQueryDevtools initialIsOpen={false} />
					{/* <DebugContextProvider> */}
					{/* <Debug /> */}
					{/* <DbWorkerProvider
						electricSqlBaseUrl={env.NEXT_PUBLIC_ELECTRIC_SQL_BASE_URL}
					> */}
					{children}
					{/* </DbWorkerProvider> */}
					{/* </DebugContextProvider> */}
				</TRPCProvider>
			</body>
		</html>
	);
}
