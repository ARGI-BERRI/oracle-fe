import "@mantine/core/styles.css";

import { MantineProvider, ColorSchemeScript, Container } from "@mantine/core";
import NextAuthProvider from "./components/NextAuth";

const siteName = "ENDROIT.NET";
const title = "神託機械";
const description = "神託機械から御神託を頂けるサイトです。";
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
    card: "summary_large_image",
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
