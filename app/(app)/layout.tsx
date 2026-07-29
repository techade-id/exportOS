import Sidebar from "@/components/Sidebar";
import ScreenHeader from "@/components/ScreenHeader";
import { logout } from "@/lib/actions";
import { COMPANY, inisial, tanggalHariIni } from "@/lib/ui";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh", background: "#EDF1EF", overflow: "hidden" }}>
      <div style={{ height: 48, flex: "none", background: "#0B3B37", display: "flex", alignItems: "center", gap: 12, padding: "0 16px" }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: "#A9D9CB", color: "#0B3B37", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 15, flex: "none", lineHeight: 1 }}>↗</div>
        <div style={{ fontSize: 14.5, fontWeight: 800, letterSpacing: ".6px", color: "#fff" }}>ExportOS</div>
        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "1.6px", color: "#A9D9CB", border: "1px solid #2E635B", borderRadius: 3, padding: "2px 7px" }}>ERP EKSPOR</span>
        <input
          placeholder="Cari buyer, dokumen, HS Code…"
          style={{ margin: "0 auto", width: "min(420px, 38%)", border: "1px solid #2E635B", background: "#0F473F", borderRadius: 4, padding: "7px 12px", fontSize: 12, color: "#E3F0EA", outlineColor: "#A9D9CB" }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{COMPANY}</div>
            <div style={{ fontSize: 10, color: "#7FA89E" }}>{tanggalHariIni()}</div>
          </div>
          <div style={{ width: 30, height: 30, borderRadius: 99, background: "#A9D9CB", color: "#0B3B37", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11 }}>{inisial(COMPANY)}</div>
          <form action={logout} style={{ display: "contents" }}>
            <button type="submit" className="topbar-btn" style={{ marginLeft: 4, border: "1px solid #2E635B", background: "transparent", color: "#A9D9CB", borderRadius: 4, padding: "6px 12px", fontSize: 11.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Keluar
            </button>
          </form>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <ScreenHeader />
          <div style={{ flex: 1, overflowY: "auto", overflowX: "auto", padding: "18px 20px 26px" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
