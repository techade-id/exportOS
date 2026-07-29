import { getCrmCards } from "@/lib/data";
import { NAVY } from "@/lib/ui";

export const dynamic = "force-dynamic";

const STAGES = ["INQUIRY", "NEGOSIASI", "KONTRAK", "REPEAT ORDER"];

export default async function CrmPage() {
  const cards = await getCrmCards();

  return (
    <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(210px,1fr))", gap: 14, alignItems: "start" }}>
      {STAGES.map((stage) => {
        const stageCards = cards.filter((c) => c.stage === stage);
        return (
          <div key={stage} style={{ background: "#E9F1EE", borderRadius: 6, padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "2px 6px" }}>
              <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".6px", color: "#0B3B37" }}>{stage}</span>
              <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 800, background: "#fff", color: "#5C756E", borderRadius: 4, padding: "2px 9px" }}>{stageCards.length}</span>
            </div>
            {stageCards.map((cd, i) => (
              <div key={i} className="card card-hover" style={{ borderRadius: 4, padding: "13px 14px", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 10.5, fontWeight: 600, background: "#0B3B37", color: "#A9D9CB", borderRadius: 5, padding: "2px 7px", flex: "none" }}>{cd.kode}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 800, minWidth: 0 }}>{cd.nama}</span>
                </div>
                <div style={{ fontSize: 11.5, color: "#5C756E", marginTop: 6 }}>{cd.produk}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 8 }}>
                  <span style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 12, fontWeight: 600, color: NAVY }}>{cd.nilai}</span>
                  <span style={{ marginLeft: "auto", fontSize: 10, color: "#98ADA6" }}>{cd.waktu}</span>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
