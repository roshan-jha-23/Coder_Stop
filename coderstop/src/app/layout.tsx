import type { Metadata } from "next";
import { Inter, Recursive } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "./components/theme-provider";

const inter = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coder_Stop",
  description: "A one stoop solution for all the coder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en ">
      <body className={inter.className}>
        <div className="relative">
          
        </div>
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
