import { STEP_LABELS } from "@/lib/content";
import { DOC_STATE, CHIP_GRAY, NAVY } from "@/lib/ui";
import type { Shipment } from "@/lib/types";
import { Fragment } from "react";

export default function ShipmentCard({ s, withDocs = false }: { s: Shipment; withDocs?: boolean }) {
  return (
    <div className="card" style={{ padding: withDocs ? "18px 20px" : "14px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 12, fontWeight: 600, background: "#E3F0EA", color: NAVY, borderRadius: 6, padding: "3px 8px" }}>{s.no}</span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700 }}>{s.produk}</div>
          <div style={{ fontSize: 11.5, color: "#5C756E", marginTop: 1 }}>{s.rute}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: NAVY }}>{STEP_LABELS[s.step - 1]}</div>
          <div style={{ fontSize: 11, color: "#5C756E" }}>{s.eta}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: 12 }}>
        {STEP_LABELS.map((l, i) => {
          const done = i < s.step;
          const cur = i === s.step - 1;
          return (
            <Fragment key={l}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, width: 66 }}>
                <div style={{ width: 12, height: 12, borderRadius: 99, background: done ? NAVY : "#fff", border: `2px solid ${done ? NAVY : "#C7D8D1"}` }} />
                <div style={{ fontSize: 10, fontWeight: 700, color: cur ? NAVY : done ? "#40605A" : "#98ADA6" }}>{l}</div>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div style={{ flex: 1, minWidth: 20, height: 2, borderRadius: 2, background: i < s.step - 1 ? NAVY : "#DBE6E1", marginBottom: 17 }} />
              )}
            </Fragment>
          );
        })}
      </div>
      {withDocs && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, borderTop: "1px solid #E9F1EE", marginTop: 13, paddingTop: 13 }}>
          {s.docs.map(([n, st]) => {
            const chip = DOC_STATE[st] ?? CHIP_GRAY;
            return (
              <span key={n} style={{ fontSize: 11, fontWeight: 700, color: chip.c, background: chip.b, borderRadius: 4, padding: "5px 12px" }}>
                {n} · {st}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
