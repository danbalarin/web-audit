import { TRPCProvider } from "~/server/query/client";

import { DebugContextProvider } from "../../contexts/DebugContext";
import { Debug } from "../Debug";
import { ThemeRegistry, font } from "../ThemeRegistry";

export function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={font.variable}>
				<ThemeRegistry />
				<TRPCProvider>
					<DebugContextProvider>
						<Debug />
						{children}
					</DebugContextProvider>
				</TRPCProvider>
			</body>
		</html>
	);
}
