import type { Metadata } from "next";
import { getCurrentLocale } from "@/lib/i18n/get-dictionary";
import "./globals.scss";

export const metadata: Metadata = {
  title: "GĐPT Việt Nam",
  description: "Gia Đình Phật Tử Việt Nam",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getCurrentLocale();

  return (
    <html lang={locale}>
      <body>
        {children}
      </body>
    </html>
  );
}
