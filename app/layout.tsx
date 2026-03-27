import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "MSPDirectory.io — Find Managed Service Providers",
  description:
    "Browse and compare hundreds of vetted Managed Service Providers (MSPs) by location, specialty, certifications, and company size.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <Navbar />
        <div className="flex-1">{children}</div>
        <footer className="bg-white border-t border-gray-200 py-8 mt-10">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} MSPDirectory.io — Connecting businesses with top IT service
            providers.
          </div>
        </footer>
      </body>
    </html>
  );
}
