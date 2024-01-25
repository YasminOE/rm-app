import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/config/site";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#E9EEEA]">
      <body className={urbanist.className}>{children}</body>
    </html>
  );
}
