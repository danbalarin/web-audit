import { TRPCProvider } from "~/server/query/client";

import { DbWorkerProvider } from "../DbWorkerProvider";
import { ThemeRegistry, font } from "../ThemeRegistry";

export function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={font.variable}>
				<ThemeRegistry />
				<TRPCProvider>
					{/* <DebugContextProvider> */}
					{/* <Debug /> */}
					<DbWorkerProvider>{children}</DbWorkerProvider>
					{/* </DebugContextProvider> */}
				</TRPCProvider>
			</body>
		</html>
	);
}
