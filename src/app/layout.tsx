import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-shippori",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Go Go ふぁーまー | 農業マッチングプラットフォーム",
  description:
    "農業 × 人 × テクノロジー。学生・社会人の農業体験から、農家の人手確保、AgTech企業と農家のマッチングまで。Go Go ふぁーまーで農業の未来をつくろう。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${shipporiMincho.variable}`}
    >
      <body className="bg-[#F8F4EF] min-h-screen">
        <Navigation />
        <div className="pb-16 md:pb-0">{children}</div>
      </body>
    </html>
  );
}
