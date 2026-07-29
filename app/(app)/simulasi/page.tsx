import { getBuyers, getProducts } from "@/lib/data";
import SimulasiClient from "./SimulasiClient";

export const dynamic = "force-dynamic";

export default async function SimulasiPage() {
  const [products, buyers] = await Promise.all([getProducts(), getBuyers()]);
  return <SimulasiClient products={products.filter((p) => p.sim)} buyers={buyers} />;
}
