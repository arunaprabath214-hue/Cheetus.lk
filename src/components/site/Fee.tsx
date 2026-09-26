import { Info } from "lucide-react";
import { Section } from "./Section";

export function Fee() {
  return (
    <Section eyebrow="Fee" title="Registration & KYC Processing Fee">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-card md:p-12">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="text-base text-charcoal-soft md:text-lg">
              A one-time registration and KYC document processing fee of
            </p>
            <div className="text-3xl font-semibold text-gradient-primary md:text-4xl">Rs. 1,000</div>
          </div>
          <p className="mt-4 text-base text-charcoal-soft md:text-lg">
            may apply. This fee is for registration handling, KYC process,
            document file creation, and administrative communication.
          </p>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-secondary/60 p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-charcoal-soft">
              <span className="font-semibold text-charcoal">Important:</span>{" "}
              This fee is not an investment, not a deposit, not a cheetu
              installment, and does not guarantee participation in any cheetu group.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}