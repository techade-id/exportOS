import type { Buyer, CrmCard, Inquiry, Invoice, Product, Quote, Shipment, TaskItem, Checks } from "./types";

// Static in-memory data used when Supabase env vars are not configured ("demo mode").
// The same rows are inserted by supabase/schema.sql.

export const DEMO_PRODUCTS: Product[] = [
  { id: "kopi", nama: "Kopi Arabika Gayo", deskripsi: "Green bean grade 1, single origin Aceh Tengah.", hs: "0901.11", unit: "karung 60 kg", hpp: 310, kemasan_cost: 22, default_qty: 120, kemasan: "Karung goni 60 kg + inner GrainPro", moq: "80 karung", fob_display: "US$ 405 / karung", status: "SIAP EKSPOR", ok: true, sim: true },
  { id: "rotan", nama: "Furnitur Rotan Set", deskripsi: "Set kursi + meja, knock-down, finishing natural.", hs: "9401.53", unit: "set", hpp: 96, kemasan_cost: 11, default_qty: 140, kemasan: "Karton + palet fumigasi (ISPM 15)", moq: "50 set", fob_display: "US$ 131 / set", status: "SIAP EKSPOR", ok: true, sim: true },
  { id: "kakao", nama: "Kakao Fermentasi", deskripsi: "Biji fermentasi penuh, kadar air < 7,5%.", hs: "1801.00", unit: "karung 62,5 kg", hpp: 212, kemasan_cost: 14, default_qty: 300, kemasan: "Karung 62,5 kg", moq: "200 karung", fob_display: "US$ 276 / karung", status: "SIAP EKSPOR", ok: true, sim: true },
  { id: "vanili", nama: "Vanili Grade A", deskripsi: null, hs: "0905.10", unit: null, hpp: null, kemasan_cost: null, default_qty: null, kemasan: "Vacuum pack 1 kg", moq: "25 kg", fob_display: "—", status: "UJI LAB", ok: false, sim: false },
  { id: "pala", nama: "Pala Kupas", deskripsi: null, hs: "0908.11", unit: null, hpp: null, kemasan_cost: null, default_qty: null, kemasan: "Karung 50 kg", moq: "100 karung", fob_display: "—", status: "BUTUH COO", ok: false, sim: false },
];

export const DEMO_BUYERS: Buyer[] = [
  { id: "sakura", nama: "Sakura Trade Co., Ltd.", negara: "Jepang", kode: "JP", port: "Yokohama", freight: 1850 },
  { id: "windmolen", nama: "Windmolen Foods BV", negara: "Belanda", kode: "NL", port: "Rotterdam", freight: 2650 },
  { id: "gulf", nama: "Gulf Spice General Trading", negara: "Uni Emirat Arab", kode: "AE", port: "Jebel Ali", freight: 2100 },
];

export const DEMO_CRM: CrmCard[] = [
  { stage: "INQUIRY", nama: "Al Noor Trading", kode: "AE", produk: "Pala & lada hitam", nilai: "—", waktu: "hari ini" },
  { stage: "INQUIRY", nama: "Hanwoo Mart", kode: "KR", produk: "Rumput laut kering", nilai: "—", waktu: "2 hari" },
  { stage: "INQUIRY", nama: "Casa Verde", kode: "ES", produk: "Home decor rotan", nilai: "—", waktu: "3 hari" },
  { stage: "INQUIRY", nama: "Maple Roasters", kode: "CA", produk: "Kopi arabika specialty", nilai: "—", waktu: "5 hari" },
  { stage: "INQUIRY", nama: "Tokyo Bites", kode: "JP", produk: "Kakao fermentasi", nilai: "—", waktu: "1 mgg" },
  { stage: "NEGOSIASI", nama: "Sakura Trade Co.", kode: "JP", produk: "Kopi Gayo · 1×20ft", nilai: "US$ 48.600", waktu: "hari ini" },
  { stage: "NEGOSIASI", nama: "Windmolen Foods", kode: "NL", produk: "Kakao · CIF Rotterdam", nilai: "US$ 82.800", waktu: "kemarin" },
  { stage: "NEGOSIASI", nama: "Gulf Spice", kode: "AE", produk: "Pala 2 ton", nilai: "US$ 21.400", waktu: "2 hari" },
  { stage: "NEGOSIASI", nama: "Nordic Living", kode: "SE", produk: "Furnitur rotan 1×40ft", nilai: "US$ 18.300", waktu: "4 hari" },
  { stage: "KONTRAK", nama: "Sakura Trade Co.", kode: "JP", produk: "SHP-0231 · Kopi Gayo", nilai: "US$ 48.600", waktu: "aktif" },
  { stage: "KONTRAK", nama: "Hafen Kakao GmbH", kode: "DE", produk: "SHP-0233 · Kakao", nilai: "US$ 63.700", waktu: "aktif" },
  { stage: "REPEAT ORDER", nama: "Sakura Trade Co.", kode: "JP", produk: "Order ke-2 · kopi", nilai: "US$ 51.200", waktu: "selesai" },
];

export const DEMO_QUOTES: Quote[] = [
  { no: "QUO-2026-018", buyer: "Sakura Trade Co. · JP", term: "FOB Belawan", nilai: "US$ 48.600", status: "KONTRAK" },
  { no: "QUO-2026-017", buyer: "Windmolen Foods · NL", term: "CIF Rotterdam", nilai: "US$ 82.800", status: "TERKIRIM" },
  { no: "QUO-2026-016", buyer: "Gulf Spice · AE", term: "CFR Jebel Ali", nilai: "US$ 21.400", status: "NEGO" },
  { no: "QUO-2026-015", buyer: "Nordic Living · SE", term: "FOB Semarang", nilai: "US$ 18.300", status: "DRAFT" },
  { no: "QUO-2026-014", buyer: "Hafen Kakao GmbH · DE", term: "CIF Hamburg", nilai: "US$ 63.700", status: "KONTRAK" },
];

export const DEMO_INVOICES: Invoice[] = [
  { inv: "INV-0712", buyer: "Sakura Trade Co. · JP", metode: "T/T 30–70", total: "US$ 48.600", paid: 30, note: "Pelunasan 05 Agu", status: "DP DITERIMA" },
  { inv: "INV-0709", buyer: "Hafen Kakao · DE", metode: "L/C at sight", total: "US$ 63.700", paid: 0, note: "Menunggu presentasi dokumen", status: "L/C DIBUKA" },
  { inv: "INV-0701", buyer: "Sakura Trade Co. · JP", metode: "T/T 30–70", total: "US$ 51.200", paid: 100, note: "Lunas 12 Jul", status: "LUNAS" },
];

export const DEMO_SHIPMENTS: Shipment[] = [
  { no: "SHP-0231", produk: "Kopi Arabika Gayo · 1×20ft", rute: "Belawan → Yokohama (JP)", eta: "ETA 08 Agu", step: 3, docs: [["Invoice", "SIAP"], ["Packing List", "SIAP"], ["PEB", "SIAP"], ["COO", "AJUKAN"], ["B/L", "TERBIT"]] },
  { no: "SHP-0232", produk: "Furnitur Rotan · 1×40ft HC", rute: "Semarang → Rotterdam (NL)", eta: "ETD 02 Agu", step: 2, docs: [["Invoice", "SIAP"], ["Packing List", "SIAP"], ["PEB", "REVIEW"], ["COO", "BELUM"], ["B/L", "—"]] },
  { no: "SHP-0233", produk: "Kakao Fermentasi · 1×20ft", rute: "Makassar → Hamburg (DE)", eta: "Cari jadwal kapal", step: 1, docs: [["Invoice", "DRAFT"], ["Packing List", "BELUM"], ["PEB", "BELUM"], ["COO", "BELUM"], ["B/L", "—"]] },
];

export const DEMO_TASKS: TaskItem[] = [
  { titel: "Unggah COO untuk SHP-0231", deadline: "Jatuh tempo 30 Jul", warn: true },
  { titel: "Review draft PEB SHP-0232", deadline: "Sebelum stuffing 02 Agu", warn: true },
  { titel: "Pelunasan T/T 70% — INV-0712", deadline: "Jatuh tempo 05 Agu", warn: false },
];

export const DEMO_INQUIRIES: Inquiry[] = [
  { buyer: "Sakura Trade Co. · JP", teks: "Minta sample kopi 5 kg", waktu: "hari ini" },
  { buyer: "Windmolen Foods · NL", teks: "Nego harga CIF Rotterdam", waktu: "kemarin" },
  { buyer: "Gulf Spice · AE", teks: "Inquiry pala & lada 2 ton", waktu: "2 hari lalu" },
];

export const INITIAL_CHECKS: Checks = { nib: true, npwp: true, akta: true, valas: false, hs: true, kemasan: true, coo: true, uji: false, katalog: true, pricelist: true, web: true, sample: false };
