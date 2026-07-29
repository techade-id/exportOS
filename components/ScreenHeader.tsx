"use client";

import { usePathname } from "next/navigation";
import { TITLES } from "@/lib/content";

export default function ScreenHeader() {
  const pathname = usePathname();
  const key = pathname.replace(/^\//, "") || "dashboard";
  const [title, sub] = TITLES[key] ?? TITLES.dashboard;

  return (
    <div style={{ height: 52, flex: "none", background: "#fff", borderBottom: "1px solid #DBE6E1", display: "flex", alignItems: "center", gap: 12, padding: "0 20px" }}>
      <div style={{ minWidth: 0, display: "flex", alignItems: "baseline", gap: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-.2px", whiteSpace: "nowrap" }}>{title}</div>
        <div style={{ fontSize: 11.5, color: "#5C756E" }}>{sub}</div>
      </div>
    </div>
  );
}
