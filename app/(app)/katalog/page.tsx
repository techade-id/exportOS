import StatusChip from "@/components/StatusChip";
import { getProducts } from "@/lib/data";
import { CHIP_AMBER, CHIP_GREEN, NAVY } from "@/lib/ui";

export const dynamic = "force-dynamic";

const cols = "1.5fr 100px 1.6fr 110px 150px 130px";

export default async function KatalogPage() {
  const products = await getProducts();
  const siap = products.filter((p) => p.ok).length;

  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 12.5, color: "#5C756E" }}><b>{products.length} produk</b> di katalog · {siap} siap ekspor</span>
        <button className="btn-primary" style={{ marginLeft: "auto", padding: "9px 16px", fontSize: 12.5 }}>+ Tambah Produk</button>
      </div>
      <div className="card" style={{ overflowX: "auto", overflowY: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: 10, padding: "12px 20px", fontSize: 10, letterSpacing: "1.4px", fontWeight: 700, color: "#85A099", borderBottom: "1px solid #DBE6E1", background: "#F5F8F6" }}>
          <span>PRODUK</span><span>HS CODE</span><span>KEMASAN</span><span>MOQ</span><span>HARGA FOB</span><span>STATUS</span>
        </div>
        {products.map((ka) => (
          <div key={ka.id} className="row-hover" style={{ display: "grid", gridTemplateColumns: cols, gap: 10, padding: "15px 20px", borderBottom: "1px solid #E9F1EE", alignItems: "center" }}>
            <span style={{ fontSize: 13.5, fontWeight: 700 }}>{ka.nama}</span>
            <span style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 12, color: NAVY }}>{ka.hs}</span>
            <span style={{ fontSize: 12, color: "#5C756E" }}>{ka.kemasan}</span>
            <span style={{ fontSize: 12.5, fontWeight: 600 }}>{ka.moq}</span>
            <span style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 12.5 }}>{ka.fob_display}</span>
            <span><StatusChip chip={ka.ok ? CHIP_GREEN : CHIP_AMBER}>{ka.status}</StatusChip></span>
          </div>
        ))}
      </div>
      <div style={{ background: "#E3F0EA", borderRadius: 6, padding: "13px 17px", fontSize: 12.5, color: "#0B3B37", lineHeight: 1.5 }}>
        HS Code menentukan tarif bea &amp; dokumen yang diminta negara tujuan — sistem menyarankan kode dari deskripsi produk, Anda tinggal konfirmasi.
      </div>
    </div>
  );
}
