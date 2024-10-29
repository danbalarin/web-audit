import { font, ThemeRegistry } from "../ThemeRegistry";

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.variable}>
        <ThemeRegistry />
        {children}
      </body>
    </html>
  );
}
