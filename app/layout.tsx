import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-archivo" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-mono" });

export const metadata: Metadata = {
  title: "ExportOS — ERP untuk eksportir Indonesia",
  description: "ERP ekspor: katalog produk, buyer CRM, quotation, pembayaran, shipping & dokumen, simulasi ekspor.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body
        className={`${archivo.variable} ${plexMono.variable}`}
        style={{ fontFamily: "var(--font-archivo), sans-serif", color: "#122B26" }}
      >
        {children}
      </body>
    </html>
  );
}
