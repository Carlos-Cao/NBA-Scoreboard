import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "300"],
});

export const metadata: Metadata = {
  title: "NBA Scoreboard",
  description: "NBA Scoreboard is a web app to view game scores and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${openSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
