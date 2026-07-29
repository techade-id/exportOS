import Link from "next/link";
import { Fragment } from "react";
import ShipmentCard from "@/components/ShipmentCard";
import { CHECK_GROUPS, JOURNEY, PIPELINE } from "@/lib/content";
import { getChecks, getInquiries, getShipments, getTasks, readinessScore } from "@/lib/data";
import { NAVY, PALE } from "@/lib/ui";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [shipments, tasks, inquiries, checks] = await Promise.all([getShipments(), getTasks(), getInquiries(), getChecks()]);
  const totalItems = CHECK_GROUPS.reduce((a, g) => a + g.items.length, 0);
  const score = readinessScore(checks, totalItems);
  const scoreLabel = score >= 85 ? "Siap Ekspor" : score >= 60 ? "Hampir Siap" : "Tahap Persiapan";

  const kpis = [
    { label: "NILAI EKSPOR YTD", value: "US$ 86.400", delta: "+18% vs 2025", dc: "#2E7D5B", db: "#E4F1EA" },
    { label: "SHIPMENT AKTIF", value: String(shipments.length), delta: "1 sailing · 2 persiapan", dc: NAVY, db: PALE },
    { label: "BUYER PIPELINE", value: "12", delta: "4 dalam negosiasi", dc: NAVY, db: PALE },
    { label: "READINESS SCORE", value: `${score}/100`, delta: scoreLabel, dc: score >= 60 ? "#2E7D5B" : "#A16207", db: score >= 60 ? "#E4F1EA" : "#F6EEDD" },
  ];
  const maxPl = Math.max(...PIPELINE.map((p) => p.n));

  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        {kpis.map((k) => (
          <div key={k.label} className="card" style={{ padding: "17px 18px" }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: "#5C756E", letterSpacing: ".4px" }}>{k.label}</div>
            <div style={{ fontSize: 29, fontWeight: 800, marginTop: 5, letterSpacing: "-.6px" }}>{k.value}</div>
            <span style={{ display: "inline-block", marginTop: 8, fontSize: 11, fontWeight: 700, color: k.dc, background: k.db, borderRadius: 4, padding: "3px 9px" }}>{k.delta}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(320px,1.7fr) minmax(280px,1fr)", gap: 16, alignItems: "start" }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <div style={{ fontSize: 14.5, fontWeight: 800 }}>Shipment Aktif</div>
            <Link href="/shipping" style={{ fontSize: 11.5, fontWeight: 600, color: "#5C756E" }}>Modul Shipping &amp; Dokumen</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
            {shipments.map((s) => <ShipmentCard key={s.no} s={s} />)}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 14.5, fontWeight: 800 }}>Pipeline Buyer</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 13 }}>
              {PIPELINE.map((pl) => (
                <div key={pl.s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 92, fontSize: 12, fontWeight: 600, color: "#5C756E" }}>{pl.s}</span>
                  <div style={{ flex: 1, height: 9, background: PALE, borderRadius: 99 }}>
                    <div style={{ height: 9, borderRadius: 99, background: NAVY, width: `${Math.round((pl.n / maxPl) * 100)}%` }} />
                  </div>
                  <span style={{ width: 18, textAlign: "right", fontSize: 13, fontWeight: 800 }}>{pl.n}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid #DBE6E1", marginTop: 15, paddingTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              {inquiries.map((iq) => (
                <div key={iq.buyer + iq.teks} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700 }}>{iq.buyer}</div>
                    <div style={{ fontSize: 11.5, color: "#5C756E" }}>{iq.teks}</div>
                  </div>
                  <span style={{ fontSize: 10.5, color: "#85A099", flex: "none" }}>{iq.waktu}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 14.5, fontWeight: 800 }}>Perlu Tindakan</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
              {tasks.map((tk) => (
                <div key={tk.titel} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ width: 9, height: 9, borderRadius: 99, background: tk.warn ? "#C2803A" : "#7FA89E", flex: "none" }} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600 }}>{tk.titel}</div>
                    <div style={{ fontSize: 11, color: "#5C756E" }}>{tk.deadline}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: "#0B3B37", borderRadius: 6, padding: "22px 24px", color: "#E3F0EA" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: "#fff" }}>Export Journey</div>
          <span style={{ fontSize: 11.5, color: "#7FA89E" }}>Dari baru mulai sampai eksportir aktif</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", marginTop: 18 }}>
          {JOURNEY.map((j, i) => (
            <Fragment key={j.label}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 150, textAlign: "center" }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 99, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14,
                  background: j.state === "done" ? "#A9D9CB" : j.state === "current" ? NAVY : "transparent",
                  color: j.state === "done" ? "#0B3B37" : j.state === "current" ? "#fff" : "#7FA89E",
                  border: `2px solid ${j.state === "next" ? "#2E635B" : "#A9D9CB"}`,
                }}>
                  {j.state === "done" ? "✓" : i + 1}
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 800, color: j.state === "next" ? "#7FA89E" : "#fff" }}>{j.label}</div>
                  <div style={{ fontSize: 10.5, color: "#7FA89E", marginTop: 2, lineHeight: 1.4 }}>{j.sub}</div>
                </div>
              </div>
              {i < JOURNEY.length - 1 && (
                <div style={{ flex: 1, minWidth: 16, height: 2, background: j.state === "done" ? "#A9D9CB" : "#1E524B", marginTop: 16 }} />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
