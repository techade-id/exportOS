"use client";

import { useEffect, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Feature, Geometry } from "geojson";

type RegionPoint = { id: string; nama: string; lon: number; lat: number };
type Geo = { indo: string; ctx: string[]; pts: (RegionPoint & { xy: [number, number] })[] };

const W = 960, H = 500;
const CTX_IDS = ["458", "608", "096", "626", "036", "064", "764", "704", "116", "144"];

export default function CommodityMap({ regions, selectedId, onSelect }: {
  regions: RegionPoint[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const [geo, setGeo] = useState<Geo | null>(null);

  useEffect(() => {
    let dead = false;
    (async () => {
      const topo = await import("world-atlas/countries-110m.json");
      if (dead) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const t = (topo as any).default ?? topo;
      const all = (feature(t, t.objects.countries) as unknown as FeatureCollection).features as Feature<Geometry>[];
      const indo = all.find((f) => String(f.id) === "360");
      if (!indo) return;
      const ctx = all.filter((f) => CTX_IDS.includes(String(f.id)));
      const proj = geoMercator().fitExtent([[16, 16], [W - 16, H - 44]], indo);
      const path = geoPath(proj);
      setGeo({
        indo: path(indo) || "",
        ctx: ctx.map((f) => path(f)).filter(Boolean) as string[],
        pts: regions.map((r) => ({ ...r, xy: proj([r.lon, r.lat]) as [number, number] })),
      });
    })();
    return () => { dead = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(regions.map((r) => r.id))]);

  if (!geo) {
    return (
      <div style={{ width: "100%", minHeight: 380, display: "flex", alignItems: "center", justifyContent: "center", background: "#E3F0EA", borderRadius: 12, color: "#5C756E", fontSize: 14 }}>
        Memuat peta Indonesia…
      </div>
    );
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block", background: "#E3F0EA", borderRadius: 12 }}>
      {geo.ctx.map((d, i) => <path key={i} d={d} fill="#DCE7E9" />)}
      <path d={geo.indo} fill="#A9D9CB" stroke="#0E4F4A" strokeWidth="0.9" />
      {geo.pts.map((p) => {
        const sel = p.id === selectedId;
        return (
          <g key={p.id} transform={`translate(${p.xy[0]},${p.xy[1]})`} style={{ cursor: "pointer" }} onClick={() => onSelect(p.id)}>
            <circle r="16" fill="transparent" />
            <circle r="9" fill={sel ? "#0E4F4A" : "#ffffff"} stroke="#0E4F4A" strokeWidth="2.5">
              {sel && <animate attributeName="r" values="9;11;9" dur="1.6s" repeatCount="indefinite" />}
            </circle>
            <circle r="3" fill={sel ? "#A9D9CB" : "#0E4F4A"} />
            <text y="28" textAnchor="middle" style={{ fontFamily: "var(--font-archivo), sans-serif", fontSize: 13, fontWeight: sel ? 800 : 600, fill: "#122B26", paintOrder: "stroke", stroke: "#E3F0EA", strokeWidth: 4 }}>{p.nama}</text>
          </g>
        );
      })}
    </svg>
  );
}
