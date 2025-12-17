import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700", "900"], // Regular, Bold, Black (for Impact feel)
});

export const metadata: Metadata = {
  title: "LearnApart Workshop Wrapped 2025",
  description: "Your year in review.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-deep-void text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
