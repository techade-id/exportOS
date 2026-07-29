"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions";
import { MUTED, NAVY } from "@/lib/ui";

const labelStyle: React.CSSProperties = { fontSize: 10.5, fontWeight: 700, letterSpacing: ".8px", color: MUTED, marginBottom: 5 };
const inputStyle: React.CSSProperties = { width: "100%", border: "1px solid #DBE6E1", borderRadius: 4, padding: "10px 12px", fontSize: 13, color: "#122B26", outlineColor: NAVY };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0B3B37", padding: 24 }}>
      <form action={formAction} style={{ width: 400, background: "#fff", borderRadius: 6, padding: "36px 36px 30px", boxShadow: "0 20px 50px rgba(0,0,0,.25)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 6, background: "#A9D9CB", color: "#0B3B37", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 17, lineHeight: 1 }}>↗</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: ".4px" }}>ExportOS</div>
            <div style={{ fontSize: 10.5, color: MUTED }}>ERP untuk eksportir Indonesia</div>
          </div>
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, marginTop: 26 }}>Masuk ke akun Anda</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
          <div>
            <div style={labelStyle}>EMAIL</div>
            <input name="email" type="email" placeholder="nama@perusahaan.id" style={inputStyle} />
          </div>
          <div>
            <div style={labelStyle}>KATA SANDI</div>
            <input name="password" type="password" placeholder="••••••••" style={inputStyle} />
          </div>
        </div>
        {state?.error && (
          <div style={{ marginTop: 12, fontSize: 12, color: "#A13333", background: "#F9ECEC", borderRadius: 4, padding: "8px 12px" }}>{state.error}</div>
        )}
        <button type="submit" disabled={pending} className="btn-primary" style={{ width: "100%", padding: 12, fontSize: 13.5, marginTop: 18, opacity: pending ? 0.7 : 1 }}>
          {pending ? "Memproses…" : "Masuk"}
        </button>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontSize: 11.5 }}>
          <span style={{ color: MUTED, cursor: "pointer" }}>Lupa kata sandi?</span>
          <button type="submit" name="intent" value="signup" disabled={pending} style={{ color: NAVY, fontWeight: 700, cursor: "pointer", background: "none", border: "none", fontSize: 11.5, fontFamily: "inherit", padding: 0 }}>
            Buat akun
          </button>
        </div>
      </form>
    </div>
  );
}
