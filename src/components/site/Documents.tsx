import { Check } from "lucide-react";
import { Section } from "./Section";

const docs = [
  "NIC copy",
  "Contact number",
  "Address details",
  "Monthly payment ability",
  "Required amount goal",
  "Signature / declaration if required",
  "Additional documents if requested during KYC review",
];

export function Documents() {
  return (
    <Section id="documents" eyebrow="Checklist" title="Documents Required" subtitle="Please have the following ready for the KYC process.">
      <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
        {docs.map((d) => (
          <div
            key={d}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
              <Check className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium text-charcoal">{d}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}