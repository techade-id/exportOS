import type { Chip } from "@/lib/ui";

export default function StatusChip({ chip, children }: { chip: Chip; children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: ".4px", color: chip.c, background: chip.b, borderRadius: 4, padding: "4px 11px" }}>
      {children}
    </span>
  );
}
