export type Product = {
  id: string;
  nama: string;
  deskripsi: string | null;
  hs: string;
  unit: string | null;
  hpp: number | null;
  kemasan_cost: number | null;
  default_qty: number | null;
  kemasan: string | null;
  moq: string | null;
  fob_display: string | null;
  status: string;
  ok: boolean;
  sim: boolean;
};

export type Buyer = {
  id: string;
  nama: string;
  negara: string;
  kode: string;
  port: string;
  freight: number;
};

export type CrmCard = { stage: string; nama: string; kode: string; produk: string; nilai: string; waktu: string };
export type Quote = { no: string; buyer: string; term: string; nilai: string; status: string };
export type Invoice = { inv: string; buyer: string; metode: string; total: string; paid: number; note: string; status: string };
export type Shipment = { no: string; produk: string; rute: string; eta: string; step: number; docs: [string, string][] };
export type TaskItem = { titel: string; deadline: string; warn: boolean };
export type Inquiry = { buyer: string; teks: string; waktu: string };
export type Checks = Record<string, boolean>;
