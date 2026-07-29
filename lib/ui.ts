// Shared color tokens + status→chip color maps from the design.

export const NAVY = "#0E4F4A";
export const DARK = "#0B3B37";
export const PALE = "#E3F0EA";
export const MUTED = "#5C756E";
export const INK = "#122B26";
export const BORDER = "#DBE6E1";
export const FAINT = "#85A099";

export type Chip = { c: string; b: string };
export const CHIP_GREEN: Chip = { c: "#2E7D5B", b: "#E4F1EA" };
export const CHIP_AMBER: Chip = { c: "#A16207", b: "#F6EEDD" };
export const CHIP_TEAL: Chip = { c: "#0E4F4A", b: "#E3F0EA" };
export const CHIP_GRAY: Chip = { c: "#5C756E", b: "#E9F1EE" };

export const DOC_STATE: Record<string, Chip> = { SIAP: CHIP_GREEN, TERBIT: CHIP_GREEN, AJUKAN: CHIP_AMBER, REVIEW: CHIP_AMBER, DRAFT: CHIP_AMBER, BELUM: CHIP_GRAY, "—": CHIP_GRAY };
export const QUOTE_STATE: Record<string, Chip> = { KONTRAK: CHIP_GREEN, TERKIRIM: CHIP_TEAL, NEGO: CHIP_AMBER, DRAFT: CHIP_GRAY };
export const PAY_STATE: Record<string, Chip> = { LUNAS: CHIP_GREEN, "DP DITERIMA": CHIP_TEAL, "L/C DIBUKA": CHIP_AMBER };

export const fmtUsd = (n: number) => "US$ " + Math.round(n).toLocaleString("id-ID");

export const COMPANY = process.env.NEXT_PUBLIC_COMPANY_NAME || "CV Nusantara Kriya";

export function inisial(perusahaan: string) {
  return perusahaan.replace(/^(CV|PT|UD)\.?\s+/i, "").split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export function tanggalHariIni() {
  return new Date().toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "short", year: "numeric" });
}
