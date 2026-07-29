import Link from "next/link";
import { JOURNEY_PAGE, JOURNEY_STATS } from "@/lib/content";
import { NAVY } from "@/lib/ui";

export default function JourneyPage() {
  return (
    <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "minmax(360px,1.5fr) minmax(280px,1fr)", gap: 16, alignItems: "start" }}>
      <div className="card" style={{ padding: 24 }}>
        <div style={{ fontSize: 14.5, fontWeight: 800 }}>Perjalanan Anda</div>
        <div style={{ fontSize: 12, color: "#5C756E", marginTop: 2 }}>Milestone dari baru mulai sampai eksportir aktif — terinspirasi kisah UMKM di Bab 3.</div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 18 }}>
          {JOURNEY_PAGE.map((jp, i) => (
            <div key={jp.label} style={{ display: "flex", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 99, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flex: "none",
                  background: jp.state === "done" ? "#A9D9CB" : jp.state === "current" ? NAVY : "#fff",
                  color: jp.state === "done" ? "#0B3B37" : jp.state === "current" ? "#fff" : "#98ADA6",
                  border: `2px solid ${jp.state === "next" ? "#C7D8D1" : jp.state === "current" ? NAVY : "#A9D9CB"}`,
                }}>
                  {jp.state === "done" ? "✓" : i + 1}
                </div>
                {i < JOURNEY_PAGE.length - 1 && (
                  <div style={{ width: 2, flex: 1, minHeight: 26, background: jp.state === "done" ? "#A9D9CB" : "#DBE6E1" }} />
                )}
              </div>
              <div style={{ paddingBottom: 20, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: jp.state === "next" ? "#98ADA6" : "#122B26" }}>{jp.label}</span>
                  <span style={{ fontSize: 11, color: "#98ADA6" }}>{jp.when}</span>
                </div>
                <div style={{ fontSize: 12.5, color: "#5C756E", marginTop: 3 }}>{jp.sub}</div>
                <div style={{ fontSize: 11.5, color: "#0B3B37", background: "#E3F0EA", borderRadius: 4, padding: "8px 12px", marginTop: 8, lineHeight: 1.5, display: "inline-block" }}>{jp.tip}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ background: "#0B3B37", borderRadius: 6, padding: 22, color: "#E3F0EA" }}>
          <div style={{ fontSize: 11, letterSpacing: "1.6px", fontWeight: 700, color: "#7FA89E" }}>PENCAPAIAN</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 14 }}>
            {JOURNEY_STATS.map((js) => (
              <div key={js.l}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#A9D9CB", letterSpacing: "-.4px" }}>{js.v}</div>
                <div style={{ fontSize: 11, color: "#7FA89E", marginTop: 2 }}>{js.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "#0B3B37" }}>Dari buku — Bab 3</div>
          <div style={{ fontSize: 12.5, color: "#40605A", marginTop: 6, lineHeight: 1.6 }}>
            UMKM yang konsisten di tiga hal — kualitas, dokumen rapi, dan komunikasi cepat — hampir selalu mendapat repeat order dalam 6 bulan pertama.
          </div>
        </div>
        <Link href="/simulasi" className="btn-primary" style={{ display: "block", padding: 13, fontSize: 13, color: "#fff" }}>Lanjutkan ke Simulasi Ekspor →</Link>
      </div>
    </div>
  );
}
