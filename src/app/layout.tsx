// app/layout.tsx (or wherever your RootLayout is)

import type { Metadata } from "next";
import { Open_Sans, Roboto } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

// ✅ Primary font: Open Sans
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // pick weights you’ll use
  display: "swap",
});

// ✅ Secondary font: Roboto
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vessel Tracka",
  description: "Your one-stop digital follow up",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${roboto.variable} antialiased`}>
        <div className="flex">
          <Sidebar />

          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
