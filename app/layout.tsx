import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Techmire Solutions | Redefining Digital Reality",
  description: "Next-gen digital solutions agency. The Optical Core Reborn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`antialiased bg-background text-foreground overflow-x-hidden font-sans`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <Preloader />
            <CustomCursor />
            <Navbar />
            <main className="relative z-10 min-h-screen">
                {children}
            </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
