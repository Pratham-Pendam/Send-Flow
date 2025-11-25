import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore: allow side-effect CSS import without type declarations
import "../index.css";
import Providers from "@/components/providers";
import Sidebar from "@/components/sidebar";
import  Navbar  from "@/components/navbar";

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
	  <Providers>
		 <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Right section: Navbar + Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar at top */}
        <Navbar />

        {/* Main content */}
       <main className="flex-1 overflow-auto p-6 flex items-center justify-center h-full mb-22">
  {children}
</main>
      </div>
    </div>
        </Providers>
			</body>
		</html>
	);
}
