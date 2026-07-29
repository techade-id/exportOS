"use client";

import { useMemo, useState } from "react";
import CommodityMap from "@/components/CommodityMap";
import { REGIONS } from "@/lib/content";
import { MUTED, NAVY, PALE } from "@/lib/ui";

export default function PetaPage() {
  const [mode, setMode] = useState<"daerah" | "negara">("daerah");
  const [regionId, setRegionId] = useState("sumatera");
  const [komIdx, setKomIdx] = useState(0);
  const [country, setCountry] = useState("JP");

  const region = REGIONS.find((r) => r.id === regionId) ?? REGIONS[0];
  const kom = region.komoditas[Math.min(komIdx, region.komoditas.length - 1)];
  const maxShare = Math.max(...kom.tujuan.map((t) => t.share));

  const countries = useMemo(() => {
    const index: Record<string, { kode: string; nama: string; items: { nama: string; hs: string; region: string; share: number }[] }> = {};
    REGIONS.forEach((r) => r.komoditas.forEach((k) => k.tujuan.forEach((t) => {
      (index[t.k] = index[t.k] || { kode: t.k, nama: t.n, items: [] }).items.push({ nama: k.nama, hs: k.hs, region: r.nama, share: t.share });
    })));
    return Object.values(index).sort((a, b) => b.items.length - a.items.length);
  }, []);
  const selCountry = countries.find((c) => c.kode === country) ?? countries[0];
  const countryItems = [...selCountry.items].sort((a, b) => b.share - a.share).slice(0, 6);

  const isModeDaerah = mode === "daerah";

  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", background: "#fff", border: "1px solid #DBE6E1", borderRadius: 4, padding: 4, gap: 4 }}>
          <div onClick={() => setMode("daerah")} style={{ padding: "6px 14px", borderRadius: 4, fontSize: 12.5, fontWeight: 700, cursor: "pointer", background: isModeDaerah ? NAVY : "transparent", color: isModeDaerah ? "#fff" : MUTED }}>Dari Daerah</div>
          <div onClick={() => setMode("negara")} style={{ padding: "6px 14px", borderRadius: 4, fontSize: 12.5, fontWeight: 700, cursor: "pointer", background: !isModeDaerah ? NAVY : "transparent", color: !isModeDaerah ? "#fff" : MUTED }}>Dari Negara Tujuan</div>
        </div>
        <span style={{ fontSize: 12, color: MUTED }}>
          {isModeDaerah ? "Klik titik di peta untuk melihat komoditas unggulan daerah itu." : "Pilih negara untuk melihat komoditas Indonesia yang laku di sana."}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, alignItems: "start" }}>
        <div className="card" style={{ padding: 16 }}>
          <CommodityMap
            regions={REGIONS.map((r) => ({ id: r.id, nama: r.nama, lon: r.lon, lat: r.lat }))}
            selectedId={regionId}
            onSelect={(id) => { setRegionId(id); setKomIdx(0); setMode("daerah"); }}
          />
          <div style={{ display: "flex", gap: 16, marginTop: 12, padding: "0 4px", fontSize: 11, color: MUTED }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 99, background: NAVY }} />Daerah terpilih</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 99, background: "#fff", border: `2px solid ${NAVY}` }} />Klik untuk lihat komoditas</span>
            <span style={{ marginLeft: "auto" }}>Sumber geometri: Natural Earth</span>
          </div>
        </div>

        {isModeDaerah ? (
          <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div style={{ fontSize: 10.5, letterSpacing: "1.6px", fontWeight: 700, color: MUTED }}>DAERAH TERPILIH</div>
              <div style={{ fontSize: 23, fontWeight: 800, marginTop: 2 }}>{region.nama}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {region.komoditas.map((km, i) => {
                const sel = i === Math.min(komIdx, region.komoditas.length - 1);
                return (
                  <div key={km.nama} onClick={() => setKomIdx(i)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: `1.5px solid ${sel ? NAVY : "#DBE6E1"}`, background: sel ? PALE : "#fff", borderRadius: 4, cursor: "pointer" }}>
                    <span style={{ flex: 1, fontSize: 13, fontWeight: 700 }}>{km.nama}</span>
                    <span style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 11, color: NAVY, background: PALE, borderRadius: 5, padding: "2px 7px" }}>HS {km.hs}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 800, color: "#2E7D5B" }}>{km.tren}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ borderTop: "1px solid #DBE6E1", paddingTop: 13 }}>
              <div style={{ fontSize: 10.5, letterSpacing: "1.6px", fontWeight: 700, color: MUTED }}>NEGARA TUJUAN — {kom.nama}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 12 }}>
                {kom.tujuan.map((t) => (
                  <div key={t.k} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 34, textAlign: "center", fontFamily: "var(--font-plex-mono), monospace", fontSize: 11, fontWeight: 600, background: "#0B3B37", color: "#A9D9CB", borderRadius: 5, padding: "3px 0", flex: "none" }}>{t.k}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600 }}>
                        <span>{t.n}</span><span style={{ color: MUTED }}>{t.share}%</span>
                      </div>
                      <div style={{ height: 7, background: PALE, borderRadius: 99, marginTop: 4 }}>
                        <div style={{ height: 7, borderRadius: 99, background: NAVY, width: `${Math.round((t.share / maxShare) * 100)}%`, transition: "width .4s ease" }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 10.5, letterSpacing: "1.6px", fontWeight: 700, color: MUTED }}>PILIH NEGARA TUJUAN</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {countries.map((c) => {
                const sel = c.kode === selCountry.kode;
                return (
                  <div key={c.kode} onClick={() => setCountry(c.kode)} style={{ padding: "5px 12px", borderRadius: 4, fontSize: 12, fontWeight: 700, cursor: "pointer", border: `1.5px solid ${sel ? NAVY : "#DBE6E1"}`, background: sel ? NAVY : "#fff", color: sel ? "#fff" : "#40605A" }}>
                    {c.nama}
                  </div>
                );
              })}
            </div>
            <div style={{ borderTop: "1px solid #DBE6E1", paddingTop: 13 }}>
              <div style={{ fontSize: 10.5, letterSpacing: "1.6px", fontWeight: 700, color: MUTED }}>KOMODITAS YANG LAKU DI {selCountry.nama.toUpperCase()}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                {countryItems.map((ki, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid #DBE6E1", borderRadius: 4 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{ki.nama}</div>
                      <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>dari {ki.region}</div>
                    </div>
                    <span style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 11, color: NAVY, background: PALE, borderRadius: 5, padding: "2px 7px" }}>HS {ki.hs}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: NAVY }}>{ki.share}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
