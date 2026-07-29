// Static reference content (not stored in the database).

export const CHECK_GROUPS = [
  { id: "legal", nama: "Legalitas Usaha", items: [
    { id: "nib", label: "NIB (OSS Berbasis Risiko)", tag: "Wajib" },
    { id: "npwp", label: "NPWP Badan Usaha", tag: "Wajib" },
    { id: "akta", label: "Akta Pendirian & SK Kemenkumham", tag: "Wajib" },
    { id: "valas", label: "Rekening Valas Perusahaan", tag: "Disarankan" },
  ] },
  { id: "produk", nama: "Kesiapan Produk", items: [
    { id: "hs", label: "HS Code Produk Ditentukan", tag: "Wajib" },
    { id: "kemasan", label: "Kemasan Standar Ekspor", tag: "Wajib" },
    { id: "coo", label: "Dokumen COO Disiapkan", tag: "Wajib" },
    { id: "uji", label: "Uji Lab / Sertifikat Mutu", tag: "Disarankan" },
  ] },
  { id: "pasar", nama: "Kesiapan Pasar", items: [
    { id: "katalog", label: "Katalog Produk Bahasa Inggris", tag: "Wajib" },
    { id: "pricelist", label: "Price List FOB / CIF", tag: "Wajib" },
    { id: "web", label: "Profil Digital (web / marketplace B2B)", tag: "Disarankan" },
    { id: "sample", label: "Prosedur Kirim Sample", tag: "Disarankan" },
  ] },
];

export type Tujuan = { n: string; k: string; share: number };
export type Komoditas = { nama: string; hs: string; tren: string; tujuan: Tujuan[] };
export type Region = { id: string; nama: string; lon: number; lat: number; komoditas: Komoditas[] };

export const REGIONS: Region[] = [
  { id: "sumatera", nama: "Sumatera", lon: 101.3, lat: -0.6, komoditas: [
    { nama: "Kopi Gayo & Robusta", hs: "0901.11", tren: "+14%", tujuan: [{ n: "Amerika Serikat", k: "US", share: 34 }, { n: "Jepang", k: "JP", share: 22 }, { n: "Mesir", k: "EG", share: 16 }] },
    { nama: "Karet Alam (SIR 20)", hs: "4001.22", tren: "+6%", tujuan: [{ n: "Amerika Serikat", k: "US", share: 30 }, { n: "Jepang", k: "JP", share: 24 }, { n: "Tiongkok", k: "CN", share: 18 }] },
    { nama: "Minyak Sawit (CPO)", hs: "1511.10", tren: "+9%", tujuan: [{ n: "India", k: "IN", share: 38 }, { n: "Tiongkok", k: "CN", share: 21 }, { n: "Pakistan", k: "PK", share: 13 }] },
  ] },
  { id: "jawa", nama: "Jawa", lon: 110.2, lat: -7.4, komoditas: [
    { nama: "Furnitur & Kerajinan Kayu", hs: "9403.60", tren: "+11%", tujuan: [{ n: "Amerika Serikat", k: "US", share: 41 }, { n: "Belanda", k: "NL", share: 15 }, { n: "Jepang", k: "JP", share: 12 }] },
    { nama: "Alas Kaki", hs: "6403.99", tren: "+8%", tujuan: [{ n: "Amerika Serikat", k: "US", share: 33 }, { n: "Belgia", k: "BE", share: 14 }, { n: "Jerman", k: "DE", share: 12 }] },
    { nama: "Tekstil & Garmen", hs: "6203.42", tren: "+5%", tujuan: [{ n: "Amerika Serikat", k: "US", share: 36 }, { n: "Jepang", k: "JP", share: 13 }, { n: "Korea Selatan", k: "KR", share: 10 }] },
  ] },
  { id: "kalimantan", nama: "Kalimantan", lon: 114.2, lat: 0.2, komoditas: [
    { nama: "Kayu Olahan & Plywood", hs: "4412.31", tren: "+7%", tujuan: [{ n: "Jepang", k: "JP", share: 35 }, { n: "Tiongkok", k: "CN", share: 22 }, { n: "Korea Selatan", k: "KR", share: 14 }] },
    { nama: "Udang & Perikanan", hs: "0306.17", tren: "+10%", tujuan: [{ n: "Amerika Serikat", k: "US", share: 38 }, { n: "Jepang", k: "JP", share: 26 }] },
  ] },
  { id: "sulawesi", nama: "Sulawesi", lon: 121.2, lat: -1.9, komoditas: [
    { nama: "Kakao Fermentasi", hs: "1801.00", tren: "+16%", tujuan: [{ n: "Malaysia", k: "MY", share: 29 }, { n: "Amerika Serikat", k: "US", share: 24 }, { n: "Jerman", k: "DE", share: 15 }] },
    { nama: "Rumput Laut", hs: "1212.21", tren: "+13%", tujuan: [{ n: "Tiongkok", k: "CN", share: 52 }, { n: "Korea Selatan", k: "KR", share: 16 }] },
    { nama: "Mete Gelondong", hs: "0801.31", tren: "+4%", tujuan: [{ n: "Vietnam", k: "VN", share: 48 }, { n: "India", k: "IN", share: 22 }] },
  ] },
  { id: "balinusra", nama: "Bali & Nusra", lon: 117.8, lat: -8.8, komoditas: [
    { nama: "Kerajinan & Home Decor", hs: "4602.19", tren: "+12%", tujuan: [{ n: "Amerika Serikat", k: "US", share: 37 }, { n: "Australia", k: "AU", share: 18 }, { n: "Jepang", k: "JP", share: 11 }] },
    { nama: "Vanili", hs: "0905.10", tren: "+21%", tujuan: [{ n: "Amerika Serikat", k: "US", share: 44 }, { n: "Prancis", k: "FR", share: 19 }] },
  ] },
  { id: "malukupapua", nama: "Maluku & Papua", lon: 131.5, lat: -3.6, komoditas: [
    { nama: "Pala & Fuli", hs: "0908.11", tren: "+9%", tujuan: [{ n: "Belanda", k: "NL", share: 31 }, { n: "Vietnam", k: "VN", share: 23 }, { n: "Italia", k: "IT", share: 12 }] },
    { nama: "Tuna & Cakalang", hs: "0304.87", tren: "+15%", tujuan: [{ n: "Jepang", k: "JP", share: 40 }, { n: "Amerika Serikat", k: "US", share: 22 }, { n: "Thailand", k: "TH", share: 14 }] },
  ] },
];

export const STEP_LABELS = ["Booking", "Stuffing", "Sailing", "Arrival"];
export const PIPELINE = [{ s: "Inquiry", n: 5 }, { s: "Negosiasi", n: 4 }, { s: "Kontrak", n: 2 }, { s: "Repeat Order", n: 1 }];

export const JOURNEY = [
  { label: "Legalitas Beres", sub: "NIB & dokumen dasar lengkap", state: "done" },
  { label: "Buyer Pertama", sub: "Kontrak Sakura Trade — Mei 2026", state: "done" },
  { label: "Shipment Pertama", sub: "SHP-0219 · Yokohama — Jun 2026", state: "done" },
  { label: "Repeat Order", sub: "1 dari 3 repeat order tercapai", state: "current" },
  { label: "Eksportir Aktif", sub: "Minimal 1 shipment / bulan", state: "next" },
];

export const JOURNEY_PAGE = [
  { label: "Legalitas Beres", when: "Feb 2026", sub: "NIB, NPWP, dan akta perusahaan lengkap.", tip: "Bab 1 — semua izin kini satu pintu lewat OSS. Mulai dari sini.", state: "done" },
  { label: "Buyer Pertama", when: "Mei 2026", sub: "Kontrak pertama dengan Sakura Trade Co.", tip: "Bab 3 — buyer pertama paling sering datang dari pameran & marketplace B2B.", state: "done" },
  { label: "Shipment Pertama", when: "Jun 2026", sub: "SHP-0219 · 1×20ft kopi ke Yokohama.", tip: "Bab 1 — untuk PEB pertama, gandeng PPJK berpengalaman.", state: "done" },
  { label: "Repeat Order", when: "sedang berjalan", sub: "1 dari 3 repeat order tercapai.", tip: "Bab 3 — kualitas konsisten + komunikasi cepat = repeat order.", state: "current" },
  { label: "Eksportir Aktif", when: "target Des 2026", sub: "Minimal 1 shipment per bulan.", tip: "Diversifikasi buyer ke ≥ 3 negara untuk mengurangi risiko.", state: "next" },
];

export const JOURNEY_STATS = [
  { v: "5", l: "bulan berjalan" }, { v: "4", l: "shipment terkirim" },
  { v: "2", l: "negara tujuan" }, { v: "US$ 86.400", l: "nilai ekspor YTD" },
];

export const PAY_SUMMARY = [
  { label: "TERTAGIH YTD", value: "US$ 86.400", d: "3 invoice lunas" },
  { label: "MENUNGGU PEMBAYARAN", value: "US$ 112.300", d: "2 invoice berjalan" },
  { label: "JATUH TEMPO ≤ 7 HARI", value: "US$ 34.020", d: "INV-0712 · pelunasan 05 Agu" },
];

export const INCOTERM_DESC: Record<string, string> = {
  FOB: "Free On Board — tanggung jawab Anda sampai barang di atas kapal di pelabuhan muat.",
  CFR: "Cost & Freight — Anda menanggung ongkos kapal sampai pelabuhan tujuan.",
  CIF: "Cost, Insurance & Freight — seperti CFR, plus asuransi pengiriman.",
};

export const TITLES: Record<string, [string, string]> = {
  katalog: ["Katalog Produk & HS Code", "Produk siap ekspor dengan HS Code & spesifikasi"],
  crm: ["Buyer CRM", "Pipeline calon buyer: inquiry → negosiasi → kontrak → repeat"],
  quotation: ["Quotation & Kontrak", "Penawaran dengan Incoterms sampai draft sales contract"],
  pembayaran: ["Pembayaran Internasional", "Tracking T/T, L/C, dan jatuh tempo per invoice"],
  shipping: ["Shipping & Dokumen", "Satu shipment = satu bundle dokumen"],
  journey: ["Export Journey", "Perjalanan dari baru mulai sampai eksportir aktif"],
  dashboard: ["Dashboard", "Ringkasan aktivitas ekspor Anda"],
  readiness: ["Kesiapan Ekspor", "Checklist legalitas & Export Readiness Score"],
  peta: ["Peta Komoditas", "Komoditas unggulan daerah & negara tujuan utama"],
  simulasi: ["Simulasi Ekspor", "Dari produk sampai dokumen — 4 langkah"],
};

export const NAV_GROUPS = [
  { label: "OPERASIONAL", items: [
    { nama: "Dashboard", key: "dashboard" },
    { nama: "Kesiapan Ekspor", key: "readiness" },
    { nama: "Katalog Produk & HS Code", key: "katalog" },
    { nama: "Buyer CRM", key: "crm" },
    { nama: "Quotation & Kontrak", key: "quotation" },
    { nama: "Pembayaran Internasional", key: "pembayaran" },
    { nama: "Shipping & Dokumen", key: "shipping" },
  ] },
  { label: "INTELIJEN PASAR", items: [
    { nama: "Peta Komoditas", key: "peta" },
    { nama: "Export Journey", key: "journey" },
  ] },
  { label: "SIMULASI", items: [{ nama: "Simulasi Ekspor", key: "simulasi" }] },
];
