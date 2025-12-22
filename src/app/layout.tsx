import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import { Toaster } from "sonner";
import GodProvider from "@/provider/god-provider";

const montserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Paidego - Admin",
  description: "Paidego Control panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <GodProvider>{children}</GodProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
