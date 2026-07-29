import { getChecks } from "@/lib/data";
import ReadinessClient from "./ReadinessClient";

export const dynamic = "force-dynamic";

export default async function ReadinessPage() {
  const checks = await getChecks();
  return <ReadinessClient initialChecks={checks} />;
}
