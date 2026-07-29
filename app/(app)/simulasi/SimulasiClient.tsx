"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { INCOTERM_DESC } from "@/lib/content";
import { COMPANY, MUTED, NAVY, PALE, fmtUsd } from "@/lib/ui";
import type { Buyer, Product } from "@/lib/types";

const STEP_NAMES = ["Pilih Produk", "Buyer & Ketentuan", "Kalkulasi Harga", "Dokumen Jadi"];
const mono = "var(--font-plex-mono), monospace";

export default function SimulasiClient({ products, buyers }: { products: Product[]; buyers: Buyer[] }) {
  const [step, setStep] = useState(1);
  const [produkId, setProdukId] = useState<string | null>(null);
  const [buyerId, setBuyerId] = useState(buyers[0]?.id ?? "");
  const [incoterm, setIncoterm] = useState<"FOB" | "CFR" | "CIF">("FOB");
  const [qty, setQty] = useState(products[0]?.default_qty ?? 100);

  const produk = products.find((p) => p.id === produkId) ?? products[0];
  const buyer = buyers.find((b) => b.id === buyerId) ?? buyers[0];

  const hpp = produk?.hpp ?? 0;
  const kemasan = produk?.kemasan_cost ?? 0;
  const fobU = (hpp + kemasan) * 1.22;
  const fobT = fobU * qty;
  const freight = buyer?.freight ?? 0;
  const insurance = 0.004 * (fobT + freight);
  const total = incoterm === "FOB" ? fobT : incoterm === "CFR" ? fobT + freight : fobT + freight + insurance;

  const rows: { label: string; value: string; total?: boolean }[] = [
    { label: `Harga pokok produksi × ${qty}`, value: fmtUsd(hpp * qty) },
    { label: "Kemasan ekspor & inland", value: fmtUsd(kemasan * qty) },
    { label: "Margin 22%", value: fmtUsd(fobT - (hpp + kemasan) * qty) },
    { label: "Nilai FOB (pelabuhan muat)", value: fmtUsd(fobT) },
  ];
  if (incoterm !== "FOB") rows.push({ label: `Ocean freight → ${buyer?.port}`, value: fmtUsd(freight) });
  if (incoterm === "CIF") rows.push({ label: "Asuransi pengiriman (0,4%)", value: fmtUsd(insurance) });
  rows.push({ label: `Total ${incoterm} ${buyer?.port}`, value: fmtUsd(total), total: true });

  const docs = [
    { nama: "Commercial Invoice", no: "INV-2026-0715", ext: "PDF", status: "SIAP", sc: "#2E7D5B", sb: "#E4F1EA" },
    { nama: "Packing List", no: "PL-2026-0715", ext: "PDF", status: "SIAP", sc: "#2E7D5B", sb: "#E4F1EA" },
    { nama: "Draft PEB", no: "PEB-DRAFT-0231", ext: "XML", status: "REVIEW", sc: "#A16207", sb: "#F6EEDD" },
    { nama: "Certificate of Origin", no: "COO-REQ-0231", ext: "FORM", status: "AJUKAN", sc: "#A16207", sb: "#F6EEDD" },
  ];

  const tanggal = new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* stepper */}
      <div className="card" style={{ display: "flex", alignItems: "center", padding: "15px 22px", overflowX: "auto" }}>
        {STEP_NAMES.map((label, i) => {
          const n = i + 1, cur = n === step, done = n < step;
          return (
            <Fragment key={label}>
              <div onClick={() => done && setStep(n)} style={{ display: "flex", alignItems: "center", gap: 9, cursor: done ? "pointer" : "default" }}>
                <div style={{
                  width: 29, height: 29, borderRadius: 99, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12.5, flex: "none",
                  background: cur ? NAVY : done ? "#A9D9CB" : "#fff",
                  color: cur ? "#fff" : done ? "#0B3B37" : "#98ADA6",
                  border: `2px solid ${cur ? NAVY : done ? "#A9D9CB" : "#DBE6E1"}`,
                }}>{done ? "✓" : n}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: cur ? "#122B26" : done ? "#40605A" : "#98ADA6", whiteSpace: "nowrap" }}>{label}</div>
              </div>
              {n < 4 && <div style={{ flex: 1, minWidth: 18, height: 2, background: done ? "#A9D9CB" : "#DBE6E1", margin: "0 13px" }} />}
            </Fragment>
          );
        })}
      </div>

      {/* step 1: pilih produk */}
      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 13, color: MUTED }}>Pilih produk yang akan diekspor — data dari modul Katalog Produk.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {products.map((pc) => (
              <div key={pc.id} className="card-hover"
                onClick={() => { setProdukId(pc.id); setQty(pc.default_qty ?? 100); setStep(2); }}
                style={{ background: "#fff", border: `1.5px solid ${produkId === pc.id ? NAVY : "#DBE6E1"}`, borderRadius: 6, padding: 20, cursor: "pointer", display: "flex", flexDirection: "column", gap: 9 }}>
                <div style={{ width: 44, height: 44, borderRadius: 4, background: PALE, color: NAVY, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 17 }}>{pc.nama[0]}</div>
                <div style={{ fontSize: 15.5, fontWeight: 800, marginTop: 2 }}>{pc.nama}</div>
                <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{pc.deskripsi}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "auto", paddingTop: 6 }}>
                  <span style={{ fontFamily: mono, fontSize: 11, color: NAVY, background: PALE, borderRadius: 5, padding: "2px 7px" }}>HS {pc.hs}</span>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: MUTED }}>HPP {fmtUsd(pc.hpp ?? 0)} / {(pc.unit ?? "").split(" ")[0]}</span>
                </div>
                <div className="btn-primary" style={{ padding: 9, fontSize: 12.5 }}>Pilih Produk Ini</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* step 2: buyer & ketentuan */}
      {step === 2 && (
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, alignItems: "start" }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 14.5, fontWeight: 800 }}>Pilih Buyer</div>
            <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>Dari pipeline Buyer CRM Anda.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 13 }}>
              {buyers.map((bc) => {
                const sel = buyerId === bc.id;
                return (
                  <div key={bc.id} onClick={() => setBuyerId(bc.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 15px", border: `1.5px solid ${sel ? NAVY : "#DBE6E1"}`, background: sel ? PALE : "#fff", borderRadius: 4, cursor: "pointer" }}>
                    <span style={{ width: 38, textAlign: "center", fontFamily: mono, fontSize: 12, fontWeight: 600, background: "#0B3B37", color: "#A9D9CB", borderRadius: 6, padding: "5px 0", flex: "none" }}>{bc.kode}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700 }}>{bc.nama}</div>
                      <div style={{ fontSize: 11.5, color: MUTED }}>{bc.negara} · Port of discharge: {bc.port}</div>
                    </div>
                    <span style={{ width: 18, height: 18, borderRadius: 99, border: `2px solid ${sel ? NAVY : "#C7D8D1"}`, background: sel ? NAVY : "#fff", flex: "none" }} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 15 }}>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 800 }}>Ketentuan</div>
              <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>Produk: <b>{produk?.nama}</b></div>
            </div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "1.4px", fontWeight: 700, color: MUTED, marginBottom: 8 }}>INCOTERMS</div>
              <div style={{ display: "flex", gap: 7 }}>
                {(["FOB", "CFR", "CIF"] as const).map((c) => {
                  const sel = incoterm === c;
                  return (
                    <div key={c} onClick={() => setIncoterm(c)} style={{ flex: 1, textAlign: "center", padding: "9px 0", borderRadius: 4, fontSize: 13, fontWeight: 800, cursor: "pointer", border: `1.5px solid ${sel ? NAVY : "#DBE6E1"}`, background: sel ? NAVY : "#fff", color: sel ? "#fff" : "#40605A" }}>{c}</div>
                  );
                })}
              </div>
              <div style={{ fontSize: 11.5, color: MUTED, marginTop: 8, lineHeight: 1.5 }}>{INCOTERM_DESC[incoterm]}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "1.4px", fontWeight: 700, color: MUTED, marginBottom: 8 }}>KUANTITAS ({produk?.unit})</div>
              <input type="number" value={qty} min={1}
                onChange={(e) => { const v = parseInt(e.target.value, 10); setQty(isNaN(v) || v < 1 ? 1 : v); }}
                style={{ width: "100%", border: "1.5px solid #DBE6E1", borderRadius: 4, padding: "10px 14px", fontFamily: mono, fontSize: 15, fontWeight: 600, color: "#122B26", outlineColor: NAVY }} />
            </div>
            <button className="btn-primary" style={{ padding: 12, fontSize: 13.5 }} onClick={() => setStep(3)}>Hitung Harga →</button>
          </div>
        </div>
      )}

      {/* step 3: kalkulasi */}
      {step === 3 && (
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, alignItems: "start" }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 14.5, fontWeight: 800 }}>Kalkulasi Harga — {incoterm} {buyer?.port}</div>
            <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{produk?.nama} × {qty.toLocaleString("id-ID")} {produk?.unit} → {buyer?.nama}</div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 14 }}>
              {rows.map((hr) => (
                <div key={hr.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 12px", borderBottom: "1px solid #E9F1EE", background: hr.total ? PALE : "transparent", borderRadius: hr.total ? 10 : 0 }}>
                  <span style={{ fontSize: 13, fontWeight: hr.total ? 800 : 500, color: hr.total ? "#0B3B37" : "#40605A" }}>{hr.label}</span>
                  <span style={{ fontFamily: mono, fontSize: 13.5, fontWeight: hr.total ? 600 : 400, color: hr.total ? "#0B3B37" : "#122B26" }}>{hr.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#0B3B37", borderRadius: 6, padding: 22, color: "#fff" }}>
              <div style={{ fontSize: 11, letterSpacing: "1.6px", fontWeight: 700, color: "#7FA89E" }}>HARGA PENAWARAN / {produk?.unit}</div>
              <div style={{ fontFamily: mono, fontSize: 31, fontWeight: 600, marginTop: 8, color: "#A9D9CB" }}>{fmtUsd(total / qty)}</div>
              <div style={{ fontSize: 12, color: "#7FA89E", marginTop: 5 }}>{incoterm} {buyer?.port} · margin 22% sudah termasuk</div>
            </div>
            <button className="btn-primary" style={{ padding: 13, fontSize: 13.5 }} onClick={() => setStep(4)}>Generate Dokumen →</button>
            <button className="btn-ghost" style={{ padding: 11, fontSize: 12.5 }} onClick={() => setStep(2)}>← Ubah buyer / ketentuan</button>
          </div>
        </div>
      )}

      {/* step 4: dokumen */}
      {step === 4 && (
        <div style={{ display: "grid", gridTemplateColumns: "minmax(280px,1fr) minmax(440px,1.3fr)", gap: 16, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: PALE, borderRadius: 6, padding: "14px 16px", fontSize: 12.5, color: "#0B3B37", fontWeight: 600, lineHeight: 1.5 }}>
              Satu shipment = satu bundle dokumen. Empat dokumen di bawah dibuat otomatis dari data simulasi.
            </div>
            {docs.map((dc) => (
              <div key={dc.nama} className="card" style={{ padding: "15px 17px", display: "flex", alignItems: "center", gap: 13 }}>
                <div style={{ width: 38, height: 46, borderRadius: 5, background: PALE, border: "1px solid #C7D8D1", position: "relative", flex: "none", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 5 }}>
                  <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: ".5px", color: NAVY }}>{dc.ext}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 800 }}>{dc.nama}</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: MUTED, marginTop: 2 }}>{dc.no}</div>
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: ".5px", color: dc.sc, background: dc.sb, borderRadius: 4, padding: "4px 11px" }}>{dc.status}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 2 }}>
              <button className="btn-ghost" style={{ flex: 1, padding: 11, fontSize: 12.5 }} onClick={() => { setStep(1); setProdukId(null); }}>↺ Ulangi Simulasi</button>
              <Link href="/dashboard" className="btn-primary" style={{ flex: 1, padding: 11, fontSize: 12.5, color: "#fff" }}>Ke Dashboard →</Link>
            </div>
          </div>

          {/* commercial invoice preview */}
          <div style={{ background: "#fff", border: "1px solid #C7D8D1", borderRadius: 6, padding: "34px 38px", boxShadow: "0 10px 30px rgba(18,43,38,.08)", fontSize: 12.5 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2.5px solid #0B3B37", paddingBottom: 14 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: ".3px", color: "#0B3B37" }}>{COMPANY}</div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 3 }}>Jl. Raya Ekspor No. 17, Indonesia · exports@nusantara.id</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: 2, color: "#0B3B37" }}>COMMERCIAL INVOICE</div>
                <div style={{ fontFamily: mono, fontSize: 11.5, color: MUTED, marginTop: 3 }}>INV-2026-0715 · {tanggal}</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, padding: "16px 0", borderBottom: "1px solid #DBE6E1" }}>
              <div>
                <div style={{ fontSize: 9.5, letterSpacing: "1.4px", fontWeight: 700, color: "#85A099" }}>SOLD TO</div>
                <div style={{ fontWeight: 800, marginTop: 3 }}>{buyer?.nama}</div>
                <div style={{ color: MUTED, fontSize: 11.5 }}>{buyer?.negara} · {buyer?.port}</div>
              </div>
              <div>
                <div style={{ fontSize: 9.5, letterSpacing: "1.4px", fontWeight: 700, color: "#85A099" }}>TERMS OF DELIVERY</div>
                <div style={{ fontWeight: 800, marginTop: 3 }}>{incoterm} {buyer?.port}</div>
                <div style={{ color: MUTED, fontSize: 11.5 }}>Payment: T/T 30% DP, 70% against B/L</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 110px 120px", gap: 8, padding: "11px 0 8px", fontSize: 9.5, letterSpacing: "1.2px", fontWeight: 700, color: "#85A099", borderBottom: "1px solid #DBE6E1" }}>
              <span>DESCRIPTION</span><span style={{ textAlign: "right" }}>QTY</span><span style={{ textAlign: "right" }}>UNIT PRICE</span><span style={{ textAlign: "right" }}>AMOUNT</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 110px 120px", gap: 8, padding: "13px 0", borderBottom: "1px solid #DBE6E1", alignItems: "baseline" }}>
              <div>
                <div style={{ fontWeight: 700 }}>{produk?.nama}</div>
                <div style={{ fontFamily: mono, fontSize: 10.5, color: MUTED }}>HS {produk?.hs}</div>
              </div>
              <span style={{ textAlign: "right", fontFamily: mono }}>{qty.toLocaleString("id-ID")}</span>
              <span style={{ textAlign: "right", fontFamily: mono }}>{fmtUsd(total / qty)}</span>
              <span style={{ textAlign: "right", fontFamily: mono, fontWeight: 600 }}>{fmtUsd(total)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 30, padding: "14px 0", alignItems: "baseline" }}>
              <span style={{ fontSize: 11, letterSpacing: "1.4px", fontWeight: 800, color: "#0B3B37" }}>TOTAL {incoterm}</span>
              <span style={{ fontFamily: mono, fontSize: 17, fontWeight: 600, color: "#0B3B37" }}>{fmtUsd(total)}</span>
            </div>
            <div style={{ background: "#F5F8F6", borderRadius: 6, padding: "9px 12px", fontSize: 10.5, color: "#85A099", textAlign: "center", letterSpacing: ".5px" }}>
              DOKUMEN DEMO — angka hasil simulasi, bukan transaksi nyata
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
