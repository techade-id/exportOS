"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GROUPS } from "@/lib/content";
import { NAVY } from "@/lib/ui";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div style={{ width: 246, flex: "none", background: "#fff", borderRight: "1px solid #DBE6E1", display: "flex", flexDirection: "column", overflowY: "auto", padding: "8px 10px 0" }}>
      {NAV_GROUPS.map((g) => (
        <div key={g.label} style={{ marginTop: 16 }}>
          <div style={{ fontSize: 10, letterSpacing: "1.8px", fontWeight: 700, color: "#85A099", padding: "0 10px 7px" }}>{g.label}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {g.items.map((it) => {
              const active = pathname === `/${it.key}`;
              return (
                <Link
                  key={it.key}
                  href={`/${it.key}`}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 4,
                    fontSize: 13, fontWeight: 600,
                    color: active ? NAVY : "#40605A",
                    background: active ? "#E3F0EA" : "transparent",
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: active ? NAVY : "#C7D8D1", flex: "none" }} />
                  <span style={{ flex: 1 }}>{it.nama}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      <div style={{ marginTop: "auto", padding: "12px 6px 14px", position: "sticky", bottom: 0, background: "#fff", borderTop: "1px solid #E9F1EE" }}>
        <Link href="/simulasi" className="btn-primary" style={{ display: "block", padding: "10px 14px", fontSize: 12.5, letterSpacing: ".2px", color: "#fff" }}>
          Mulai Simulasi Ekspor →
        </Link>
      </div>
    </div>
  );
}
