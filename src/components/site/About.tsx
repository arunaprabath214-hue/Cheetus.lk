import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="About Cheetus" subtitle="A Sri Lankan company committed to structured, transparent member services.">
      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-soft md:p-12">
        <p className="text-base leading-relaxed text-charcoal-soft md:text-lg">
          Cheetus Investment Industrial Development (PVT) LTD is a Sri Lankan
          private limited company focused on structured member registration,
          documentation, and organized cheetu management support. Our approach
          is built around proper records, KYC verification, communication, and
          responsible administration.
        </p>
      </div>
    </Section>
  );
}