import StatusChip from "@/components/StatusChip";
import { PAY_SUMMARY } from "@/lib/content";
import { getInvoices } from "@/lib/data";
import { CHIP_GRAY, NAVY, PALE, PAY_STATE } from "@/lib/ui";

export const dynamic = "force-dynamic";

const cols = "110px 1.4fr 120px 130px 1fr 130px";

export default async function PembayaranPage() {
  const rows = await getInvoices();

  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {PAY_SUMMARY.map((ps) => (
          <div key={ps.label} className="card" style={{ padding: "17px 18px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#85A099", letterSpacing: "1.2px" }}>{ps.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, marginTop: 6, letterSpacing: "-.5px" }}>{ps.value}</div>
            <div style={{ fontSize: 11.5, color: "#5C756E", marginTop: 4 }}>{ps.d}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ overflowX: "auto", overflowY: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: 10, padding: "12px 20px", fontSize: 10, letterSpacing: "1.4px", fontWeight: 700, color: "#85A099", borderBottom: "1px solid #DBE6E1", background: "#F5F8F6" }}>
          <span>INVOICE</span><span>BUYER</span><span>METODE</span><span>TOTAL</span><span>TERBAYAR</span><span>STATUS</span>
        </div>
        {rows.map((py) => (
          <div key={py.inv} className="row-hover" style={{ display: "grid", gridTemplateColumns: cols, gap: 10, padding: "16px 20px", borderBottom: "1px solid #E9F1EE", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 12, color: NAVY }}>{py.inv}</span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{py.buyer}</span>
            <span style={{ fontSize: 12.5, color: "#5C756E" }}>{py.metode}</span>
            <span style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 12.5, fontWeight: 600 }}>{py.total}</span>
            <span>
              <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ flex: 1, height: 7, background: PALE, borderRadius: 99, display: "block" }}>
                  <span style={{ display: "block", height: 7, borderRadius: 99, background: NAVY, width: `${py.paid}%` }} />
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#5C756E", width: 34 }}>{py.paid}%</span>
              </span>
              <span style={{ display: "block", fontSize: 10.5, color: "#98ADA6", marginTop: 3 }}>{py.note}</span>
            </span>
            <span><StatusChip chip={PAY_STATE[py.status] ?? CHIP_GRAY}>{py.status}</StatusChip></span>
          </div>
        ))}
      </div>
    </div>
  );
}
