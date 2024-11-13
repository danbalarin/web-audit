import { TRPCProvider } from "~/server/query/client";

import { ThemeRegistry, font } from "../ThemeRegistry";

export function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={font.variable}>
				<ThemeRegistry />
				<TRPCProvider>{children}</TRPCProvider>
			</body>
		</html>
	);
}
