import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NarutoWiki",
  description: "NarutoWiki is an webapp to search and find information of ninja characters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // mt-5 mb-0 sm:mx-auto md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1436px] sm:w-full mx-5
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased   `}
      >
        {children}
      </body>
    </html>
  );
}
