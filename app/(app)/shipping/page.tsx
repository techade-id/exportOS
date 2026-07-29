import ShipmentCard from "@/components/ShipmentCard";
import { getShipments } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ShippingPage() {
  const shipments = await getShipments();

  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: "#E3F0EA", borderRadius: 6, padding: "13px 17px", fontSize: 12.5, color: "#0B3B37", lineHeight: 1.5 }}>
        <b>Satu shipment = satu bundle dokumen.</b> Invoice, Packing List, PEB, COO, dan B/L dilacak per shipment — tidak ada dokumen tercecer.
      </div>
      {shipments.map((s) => <ShipmentCard key={s.no} s={s} withDocs />)}
    </div>
  );
}
