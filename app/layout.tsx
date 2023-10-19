import "@mantine/core/styles.css";

import { MantineProvider, ColorSchemeScript, Container } from "@mantine/core";
import NextAuthProvider from "./components/NextAuth";

const siteName = "ENDROIT.NET";
const title = "浅葱神社 おみくじコーナー - Omikuji of ASAGI Shrine";
const description = "浅葱神社のおみくじコーナーであなたの運勢を占ってみましょう……";
const url = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export const metadata = {
  metadataBase: new URL(url),
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    siteName: siteName,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
    site: "@ARGI_BERRI",
    creator: "@ARGI_BERRI",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <NextAuthProvider>
          <MantineProvider>
            <Container size="xs">{children}</Container>
          </MantineProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
