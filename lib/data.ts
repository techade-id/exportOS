import { INITIAL_CHECKS, DEMO_BUYERS, DEMO_CRM, DEMO_INQUIRIES, DEMO_INVOICES, DEMO_PRODUCTS, DEMO_QUOTES, DEMO_SHIPMENTS, DEMO_TASKS } from "./demo-data";
import { supabaseConfigured } from "./supabase/config";
import { createClient } from "./supabase/server";
import type { Buyer, Checks, CrmCard, Inquiry, Invoice, Product, Quote, Shipment, TaskItem } from "./types";

// Every reader falls back to the in-memory demo data when Supabase
// is not configured, so the app works before any setup.

export async function getProducts(): Promise<Product[]> {
  if (!supabaseConfigured) return DEMO_PRODUCTS;
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*").order("ord");
  if (error || !data?.length) return DEMO_PRODUCTS;
  return data as Product[];
}

export async function getBuyers(): Promise<Buyer[]> {
  if (!supabaseConfigured) return DEMO_BUYERS;
  const supabase = await createClient();
  const { data, error } = await supabase.from("buyers").select("*").order("ord");
  if (error || !data?.length) return DEMO_BUYERS;
  return data as Buyer[];
}

export async function getCrmCards(): Promise<CrmCard[]> {
  if (!supabaseConfigured) return DEMO_CRM;
  const supabase = await createClient();
  const { data, error } = await supabase.from("crm_cards").select("*").order("ord");
  if (error || !data?.length) return DEMO_CRM;
  return data as CrmCard[];
}

export async function getQuotes(): Promise<Quote[]> {
  if (!supabaseConfigured) return DEMO_QUOTES;
  const supabase = await createClient();
  const { data, error } = await supabase.from("quotations").select("*").order("ord");
  if (error || !data?.length) return DEMO_QUOTES;
  return data as Quote[];
}

export async function getInvoices(): Promise<Invoice[]> {
  if (!supabaseConfigured) return DEMO_INVOICES;
  const supabase = await createClient();
  const { data, error } = await supabase.from("invoices").select("*").order("ord");
  if (error || !data?.length) return DEMO_INVOICES;
  return data as Invoice[];
}

export async function getShipments(): Promise<Shipment[]> {
  if (!supabaseConfigured) return DEMO_SHIPMENTS;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("shipments")
    .select("no, produk, rute, eta, step, shipment_docs(nama, status, ord)")
    .order("ord");
  if (error || !data?.length) return DEMO_SHIPMENTS;
  return data.map((s) => ({
    no: s.no, produk: s.produk, rute: s.rute, eta: s.eta, step: s.step,
    docs: (s.shipment_docs as { nama: string; status: string; ord: number }[])
      .sort((a, b) => a.ord - b.ord)
      .map((d) => [d.nama, d.status] as [string, string]),
  }));
}

export async function getTasks(): Promise<TaskItem[]> {
  if (!supabaseConfigured) return DEMO_TASKS;
  const supabase = await createClient();
  const { data, error } = await supabase.from("tasks").select("*").order("ord");
  if (error || !data?.length) return DEMO_TASKS;
  return data as TaskItem[];
}

export async function getInquiries(): Promise<Inquiry[]> {
  if (!supabaseConfigured) return DEMO_INQUIRIES;
  const supabase = await createClient();
  const { data, error } = await supabase.from("inquiries").select("*").order("ord");
  if (error || !data?.length) return DEMO_INQUIRIES;
  return data as Inquiry[];
}

export async function getChecks(): Promise<Checks> {
  if (!supabaseConfigured) return { ...INITIAL_CHECKS };
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ...INITIAL_CHECKS };
  const { data, error } = await supabase.from("readiness_state").select("item_id, checked").eq("user_id", user.id);
  const checks = { ...INITIAL_CHECKS };
  if (!error && data) for (const row of data) checks[row.item_id] = row.checked;
  return checks;
}

export function readinessScore(checks: Checks, totalItems: number) {
  const done = Object.values(checks).filter(Boolean).length;
  return Math.round((done / totalItems) * 100);
}
