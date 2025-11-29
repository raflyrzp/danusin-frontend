import type { Metadata } from "next";
// @ts-ignore - allow global CSS side-effect import without type declarations
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Danus.in - Platform Pre-Order Mahasiswa",
  description: "Cari dan jual makanan danusan di kampusmu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col bg-danus-background">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
