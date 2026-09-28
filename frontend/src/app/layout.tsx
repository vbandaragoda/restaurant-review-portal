import type { Metadata } from "next";
import { Inter, Noto_Sans_Sinhala, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const sinhala = Noto_Sans_Sinhala({ variable: "--font-sinhala", subsets: ["sinhala"], display: "swap" });
const tamil = Noto_Sans_Tamil({ variable: "--font-tamil", subsets: ["tamil"], display: "swap" });

export const metadata: Metadata = {
  title: "TasteLanka | Discover Sri Lanka's best food",
  description: "Find restaurants, explore menus, and share dining experiences across Colombo, Kandy and Galle.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sinhala.variable} ${tamil.variable} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
