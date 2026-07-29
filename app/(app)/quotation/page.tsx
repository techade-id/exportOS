import Link from "next/link";
import StatusChip from "@/components/StatusChip";
import { getQuotes } from "@/lib/data";
import { CHIP_GRAY, NAVY, QUOTE_STATE } from "@/lib/ui";

export const dynamic = "force-dynamic";

const cols = "150px 1.5fr 160px 150px 120px";

export default async function QuotationPage() {
  const quotes = await getQuotes();
  const kontrak = quotes.filter((q) => q.status === "KONTRAK").length;

  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 12.5, color: "#5C756E" }}><b>{quotes.length} penawaran</b> · {kontrak} sudah jadi kontrak</span>
        <Link href="/simulasi" className="btn-primary" style={{ marginLeft: "auto", padding: "9px 16px", fontSize: 12.5, color: "#fff" }}>Buat Penawaran Baru →</Link>
      </div>
      <div className="card" style={{ overflowX: "auto", overflowY: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: 10, padding: "12px 20px", fontSize: 10, letterSpacing: "1.4px", fontWeight: 700, color: "#85A099", borderBottom: "1px solid #DBE6E1", background: "#F5F8F6" }}>
          <span>NO. QUOTATION</span><span>BUYER</span><span>INCOTERMS</span><span>NILAI</span><span>STATUS</span>
        </div>
        {quotes.map((q) => (
          <div key={q.no} className="row-hover" style={{ display: "grid", gridTemplateColumns: cols, gap: 10, padding: "15px 20px", borderBottom: "1px solid #E9F1EE", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 12, color: NAVY }}>{q.no}</span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{q.buyer}</span>
            <span style={{ fontSize: 12.5, color: "#5C756E" }}>{q.term}</span>
            <span style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 12.5, fontWeight: 600 }}>{q.nilai}</span>
            <span><StatusChip chip={QUOTE_STATE[q.status] ?? CHIP_GRAY}>{q.status}</StatusChip></span>
          </div>
        ))}
      </div>
      <div style={{ background: "#E3F0EA", borderRadius: 6, padding: "13px 17px", fontSize: 12.5, color: "#0B3B37", lineHeight: 1.5 }}>
        Penawaran yang diterima buyer otomatis bisa diubah jadi draft <b>sales contract</b> — lengkap dengan Incoterms, syarat pembayaran, dan jadwal pengiriman.
      </div>
    </div>
  );
}
