import { Alert, ThemeRegistry } from "@repo/ui";
import { env } from "~/env.mjs";

import { ApiProvider } from "~/features/report";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          {env.SITE_URL !== "http://localhost:3000" && (
            <Alert
              severity="error"
              sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
            >
              This is only a preview, the app should run locally only
            </Alert>
          )}
          <ApiProvider>{children}</ApiProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
