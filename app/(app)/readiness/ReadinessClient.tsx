"use client";

import { useState, useTransition } from "react";
import { toggleCheck } from "@/lib/actions";
import { CHECK_GROUPS } from "@/lib/content";
import { MUTED, NAVY } from "@/lib/ui";
import type { Checks } from "@/lib/types";

export default function ReadinessClient({ initialChecks }: { initialChecks: Checks }) {
  const [checks, setChecks] = useState(initialChecks);
  const [, startTransition] = useTransition();

  const total = CHECK_GROUPS.reduce((a, g) => a + g.items.length, 0);
  const done = CHECK_GROUPS.reduce((a, g) => a + g.items.filter((i) => checks[i.id]).length, 0);
  const score = Math.round((done / total) * 100);
  const scoreLabel = score >= 85 ? "Siap Ekspor" : score >= 60 ? "Hampir Siap" : "Tahap Persiapan";
  const scoreHint = score >= 85 ? "Semua fondasi utama sudah beres. Lanjut cari buyer!" : "Lengkapi item wajib yang tersisa untuk menaikkan skor Anda.";

  const onToggle = (id: string) => {
    const next = !checks[id];
    setChecks((c) => ({ ...c, [id]: next }));
    startTransition(() => { toggleCheck(id, next); });
  };

  return (
    <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 16, alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {CHECK_GROUPS.map((cg) => (
          <div key={cg.id} className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <div style={{ fontSize: 14.5, fontWeight: 800 }}>{cg.nama}</div>
              <span style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 12, color: MUTED }}>
                {cg.items.filter((i) => checks[i.id]).length} / {cg.items.length}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 10 }}>
              {cg.items.map((ci) => (
                <label key={ci.id} className="row-hover" style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 10px", borderRadius: 4, cursor: "pointer" }}>
                  <input type="checkbox" checked={!!checks[ci.id]} onChange={() => onToggle(ci.id)} style={{ width: 18, height: 18, accentColor: NAVY, cursor: "pointer", margin: 0 }} />
                  <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: checks[ci.id] ? "#122B26" : MUTED }}>{ci.label}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: ".6px",
                    color: ci.tag === "Wajib" ? NAVY : "#85A099",
                    border: `1px solid ${ci.tag === "Wajib" ? "#A9D9CB" : "#DBE6E1"}`,
                    borderRadius: 4, padding: "3px 9px",
                  }}>{ci.tag}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: "sticky", top: 0, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="card" style={{ padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: "1.6px", fontWeight: 700, color: MUTED }}>EXPORT READINESS SCORE</div>
          <div style={{ position: "relative", width: 170, margin: "14px auto 4px" }}>
            <svg viewBox="0 0 160 160" style={{ width: 170, display: "block" }}>
              <circle cx="80" cy="80" r="64" fill="none" stroke="#E3F0EA" strokeWidth="13" />
              <circle cx="80" cy="80" r="64" fill="none" stroke={NAVY} strokeWidth="13" strokeLinecap="round"
                strokeDasharray={`${(score * 4.02).toFixed(0)} 402`} transform="rotate(-90 80 80)"
                style={{ transition: "stroke-dasharray .5s ease" }} />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
              <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1 }}>{score}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: MUTED }}>dari 100</div>
            </div>
          </div>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: NAVY }}>{scoreLabel}</div>
          <div style={{ fontSize: 12, color: MUTED, marginTop: 4, lineHeight: 1.5 }}>{scoreHint}</div>
        </div>
        <div style={{ background: "#E3F0EA", borderRadius: 6, padding: "18px 20px" }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "#0B3B37" }}>Dari buku — Bab 1</div>
          <div style={{ fontSize: 12, color: "#40605A", marginTop: 5, lineHeight: 1.55 }}>
            Legalitas adalah gerbang pertama ekspor: tanpa NIB dan dokumen dasar, langkah berikutnya tidak bisa jalan. Centang setiap item begitu dokumen Anda siap.
          </div>
        </div>
      </div>
    </div>
  );
}
