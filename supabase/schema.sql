-- ExportOS ERP — schema + seed
-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run.

-- ============ TABLES ============

create table if not exists public.products (
  id text primary key,
  nama text not null,
  deskripsi text,
  hs text not null,
  unit text,
  hpp numeric,
  kemasan_cost numeric,
  default_qty int,
  kemasan text,
  moq text,
  fob_display text,
  status text not null default 'DRAFT',
  ok boolean not null default false,
  sim boolean not null default false,
  ord int not null default 0
);

create table if not exists public.buyers (
  id text primary key,
  nama text not null,
  negara text not null,
  kode text not null,
  port text not null,
  freight numeric not null default 0,
  ord int not null default 0
);

create table if not exists public.crm_cards (
  id bigint generated always as identity primary key,
  stage text not null check (stage in ('INQUIRY','NEGOSIASI','KONTRAK','REPEAT ORDER')),
  nama text not null,
  kode text not null,
  produk text not null,
  nilai text not null default '—',
  waktu text not null default '',
  ord int not null default 0
);

create table if not exists public.quotations (
  no text primary key,
  buyer text not null,
  term text not null,
  nilai text not null,
  status text not null check (status in ('KONTRAK','TERKIRIM','NEGO','DRAFT')),
  ord int not null default 0
);

create table if not exists public.invoices (
  inv text primary key,
  buyer text not null,
  metode text not null,
  total text not null,
  paid int not null default 0 check (paid between 0 and 100),
  note text not null default '',
  status text not null,
  ord int not null default 0
);

create table if not exists public.shipments (
  no text primary key,
  produk text not null,
  rute text not null,
  eta text not null default '',
  step int not null default 1 check (step between 1 and 4),
  ord int not null default 0
);

create table if not exists public.shipment_docs (
  id bigint generated always as identity primary key,
  shipment_no text not null references public.shipments(no) on delete cascade,
  nama text not null,
  status text not null default 'BELUM',
  ord int not null default 0
);

create table if not exists public.tasks (
  id bigint generated always as identity primary key,
  titel text not null,
  deadline text not null default '',
  warn boolean not null default false,
  ord int not null default 0
);

create table if not exists public.inquiries (
  id bigint generated always as identity primary key,
  buyer text not null,
  teks text not null,
  waktu text not null default '',
  ord int not null default 0
);

-- per-user readiness checklist state
create table if not exists public.readiness_state (
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id text not null,
  checked boolean not null default false,
  primary key (user_id, item_id)
);

-- ============ ROW LEVEL SECURITY ============

alter table public.products enable row level security;
alter table public.buyers enable row level security;
alter table public.crm_cards enable row level security;
alter table public.quotations enable row level security;
alter table public.invoices enable row level security;
alter table public.shipments enable row level security;
alter table public.shipment_docs enable row level security;
alter table public.tasks enable row level security;
alter table public.inquiries enable row level security;
alter table public.readiness_state enable row level security;

-- signed-in users can read + write all business data (single-tenant starter)
do $$
declare t text;
begin
  foreach t in array array['products','buyers','crm_cards','quotations','invoices','shipments','shipment_docs','tasks','inquiries']
  loop
    execute format('drop policy if exists "authenticated all" on public.%I', t);
    execute format('create policy "authenticated all" on public.%I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;

drop policy if exists "own readiness" on public.readiness_state;
create policy "own readiness" on public.readiness_state
  for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============ SEED ============

insert into public.products (id, nama, deskripsi, hs, unit, hpp, kemasan_cost, default_qty, kemasan, moq, fob_display, status, ok, sim, ord) values
  ('kopi',  'Kopi Arabika Gayo',  'Green bean grade 1, single origin Aceh Tengah.',   '0901.11', 'karung 60 kg',   310, 22, 120, 'Karung goni 60 kg + inner GrainPro',   '80 karung',  'US$ 405 / karung', 'SIAP EKSPOR', true,  true,  1),
  ('rotan', 'Furnitur Rotan Set', 'Set kursi + meja, knock-down, finishing natural.', '9401.53', 'set',             96, 11, 140, 'Karton + palet fumigasi (ISPM 15)',    '50 set',     'US$ 131 / set',    'SIAP EKSPOR', true,  true,  2),
  ('kakao', 'Kakao Fermentasi',   'Biji fermentasi penuh, kadar air < 7,5%.',         '1801.00', 'karung 62,5 kg', 212, 14, 300, 'Karung 62,5 kg',                        '200 karung', 'US$ 276 / karung', 'SIAP EKSPOR', true,  true,  3),
  ('vanili','Vanili Grade A',      null,                                              '0905.10', null, null, null, null, 'Vacuum pack 1 kg', '25 kg',      '—', 'UJI LAB',   false, false, 4),
  ('pala',  'Pala Kupas',          null,                                              '0908.11', null, null, null, null, 'Karung 50 kg',     '100 karung', '—', 'BUTUH COO', false, false, 5)
on conflict (id) do nothing;

insert into public.buyers (id, nama, negara, kode, port, freight, ord) values
  ('sakura',    'Sakura Trade Co., Ltd.',      'Jepang',           'JP', 'Yokohama',  1850, 1),
  ('windmolen', 'Windmolen Foods BV',          'Belanda',          'NL', 'Rotterdam', 2650, 2),
  ('gulf',      'Gulf Spice General Trading',  'Uni Emirat Arab',  'AE', 'Jebel Ali', 2100, 3)
on conflict (id) do nothing;

insert into public.crm_cards (stage, nama, kode, produk, nilai, waktu, ord) values
  ('INQUIRY',      'Al Noor Trading',   'AE', 'Pala & lada hitam',       '—',           'hari ini', 1),
  ('INQUIRY',      'Hanwoo Mart',       'KR', 'Rumput laut kering',      '—',           '2 hari',   2),
  ('INQUIRY',      'Casa Verde',        'ES', 'Home decor rotan',        '—',           '3 hari',   3),
  ('INQUIRY',      'Maple Roasters',    'CA', 'Kopi arabika specialty',  '—',           '5 hari',   4),
  ('INQUIRY',      'Tokyo Bites',       'JP', 'Kakao fermentasi',        '—',           '1 mgg',    5),
  ('NEGOSIASI',    'Sakura Trade Co.',  'JP', 'Kopi Gayo · 1×20ft',      'US$ 48.600',  'hari ini', 6),
  ('NEGOSIASI',    'Windmolen Foods',   'NL', 'Kakao · CIF Rotterdam',   'US$ 82.800',  'kemarin',  7),
  ('NEGOSIASI',    'Gulf Spice',        'AE', 'Pala 2 ton',              'US$ 21.400',  '2 hari',   8),
  ('NEGOSIASI',    'Nordic Living',     'SE', 'Furnitur rotan 1×40ft',   'US$ 18.300',  '4 hari',   9),
  ('KONTRAK',      'Sakura Trade Co.',  'JP', 'SHP-0231 · Kopi Gayo',    'US$ 48.600',  'aktif',    10),
  ('KONTRAK',      'Hafen Kakao GmbH',  'DE', 'SHP-0233 · Kakao',        'US$ 63.700',  'aktif',    11),
  ('REPEAT ORDER', 'Sakura Trade Co.',  'JP', 'Order ke-2 · kopi',       'US$ 51.200',  'selesai',  12);

insert into public.quotations (no, buyer, term, nilai, status, ord) values
  ('QUO-2026-018', 'Sakura Trade Co. · JP',   'FOB Belawan',   'US$ 48.600', 'KONTRAK',  1),
  ('QUO-2026-017', 'Windmolen Foods · NL',    'CIF Rotterdam', 'US$ 82.800', 'TERKIRIM', 2),
  ('QUO-2026-016', 'Gulf Spice · AE',         'CFR Jebel Ali', 'US$ 21.400', 'NEGO',     3),
  ('QUO-2026-015', 'Nordic Living · SE',      'FOB Semarang',  'US$ 18.300', 'DRAFT',    4),
  ('QUO-2026-014', 'Hafen Kakao GmbH · DE',   'CIF Hamburg',   'US$ 63.700', 'KONTRAK',  5)
on conflict (no) do nothing;

insert into public.invoices (inv, buyer, metode, total, paid, note, status, ord) values
  ('INV-0712', 'Sakura Trade Co. · JP', 'T/T 30–70',    'US$ 48.600', 30,  'Pelunasan 05 Agu',              'DP DITERIMA', 1),
  ('INV-0709', 'Hafen Kakao · DE',      'L/C at sight', 'US$ 63.700', 0,   'Menunggu presentasi dokumen',   'L/C DIBUKA',  2),
  ('INV-0701', 'Sakura Trade Co. · JP', 'T/T 30–70',    'US$ 51.200', 100, 'Lunas 12 Jul',                  'LUNAS',       3)
on conflict (inv) do nothing;

insert into public.shipments (no, produk, rute, eta, step, ord) values
  ('SHP-0231', 'Kopi Arabika Gayo · 1×20ft',  'Belawan → Yokohama (JP)',  'ETA 08 Agu',        3, 1),
  ('SHP-0232', 'Furnitur Rotan · 1×40ft HC',  'Semarang → Rotterdam (NL)','ETD 02 Agu',        2, 2),
  ('SHP-0233', 'Kakao Fermentasi · 1×20ft',   'Makassar → Hamburg (DE)',  'Cari jadwal kapal', 1, 3)
on conflict (no) do nothing;

insert into public.shipment_docs (shipment_no, nama, status, ord) values
  ('SHP-0231', 'Invoice', 'SIAP', 1), ('SHP-0231', 'Packing List', 'SIAP', 2), ('SHP-0231', 'PEB', 'SIAP', 3), ('SHP-0231', 'COO', 'AJUKAN', 4), ('SHP-0231', 'B/L', 'TERBIT', 5),
  ('SHP-0232', 'Invoice', 'SIAP', 1), ('SHP-0232', 'Packing List', 'SIAP', 2), ('SHP-0232', 'PEB', 'REVIEW', 3), ('SHP-0232', 'COO', 'BELUM', 4), ('SHP-0232', 'B/L', '—', 5),
  ('SHP-0233', 'Invoice', 'DRAFT', 1), ('SHP-0233', 'Packing List', 'BELUM', 2), ('SHP-0233', 'PEB', 'BELUM', 3), ('SHP-0233', 'COO', 'BELUM', 4), ('SHP-0233', 'B/L', '—', 5);

insert into public.tasks (titel, deadline, warn, ord) values
  ('Unggah COO untuk SHP-0231',       'Jatuh tempo 30 Jul',      true,  1),
  ('Review draft PEB SHP-0232',       'Sebelum stuffing 02 Agu', true,  2),
  ('Pelunasan T/T 70% — INV-0712',    'Jatuh tempo 05 Agu',      false, 3);

insert into public.inquiries (buyer, teks, waktu, ord) values
  ('Sakura Trade Co. · JP', 'Minta sample kopi 5 kg',      'hari ini',   1),
  ('Windmolen Foods · NL',  'Nego harga CIF Rotterdam',    'kemarin',    2),
  ('Gulf Spice · AE',       'Inquiry pala & lada 2 ton',   '2 hari lalu', 3);
