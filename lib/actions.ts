"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEMO_COOKIE, supabaseConfigured } from "./supabase/config";
import { createClient } from "./supabase/server";

export async function login(_prev: { error: string } | null, formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!supabaseConfigured) {
    const cookieStore = await cookies();
    cookieStore.set(DEMO_COOKIE, "1", { httpOnly: true, sameSite: "lax", path: "/" });
    redirect("/dashboard");
  }

  if (!email || !password) return { error: "Email dan kata sandi wajib diisi." };
  const supabase = await createClient();

  if (formData.get("intent") === "signup") {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message };
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) return { error: "Akun dibuat. Cek email Anda untuk konfirmasi, lalu masuk." };
  } else {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: "Email atau kata sandi salah." };
  }
  redirect("/dashboard");
}

export async function logout() {
  if (supabaseConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } else {
    const cookieStore = await cookies();
    cookieStore.delete(DEMO_COOKIE);
  }
  redirect("/login");
}

export async function toggleCheck(itemId: string, checked: boolean) {
  if (!supabaseConfigured) return; // demo mode: state lives in the client only
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from("readiness_state").upsert({ user_id: user.id, item_id: itemId, checked });
  revalidatePath("/readiness");
  revalidatePath("/dashboard");
}
