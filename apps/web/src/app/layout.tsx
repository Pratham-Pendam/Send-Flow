import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore: allow side-effect CSS import without type declarations
import "../index.css";
import '@xyflow/react/dist/style.css';
import Providers from "@/components/providers";
import Sidebar from "@/components/sidebar";
import  Navbar  from "@/components/navbar";
import AuthInitWrapper from "@/components/AuthInitWrapper";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "send-flow",
  description: "send-flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
                <AuthInitWrapper />

        <Providers>
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Right section: Navbar + Content */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Navbar at top */}
              <Navbar />

              {/* Main content */}
              <main className="flex-1 overflow-hidden h-full">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
