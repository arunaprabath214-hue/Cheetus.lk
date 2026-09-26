import { Logo } from "./Logo";
import { NAV, SITE } from "@/lib/site";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { lang } = useLang();
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container-tight py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-12 w-12" />
              <div>
                <p className="text-sm font-semibold text-charcoal">{SITE.shortName}</p>
                <p className="text-xs text-muted-foreground">{SITE.pv}</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              {SITE.company}. Structured member registration, KYC document
              processing, and organized cheetu management support.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal">
              {lang === "si" ? "ගමන් කරන්න" : "Navigate"}
            </p>
            <ul className="mt-4 space-y-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {lang === "si" ? n.labelSi : n.label}
                  </a>
                </li>
              ))}
              <li><a href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-primary">Terms & Conditions</a></li>
              <li><a href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-primary">Privacy Notice</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal">
              {lang === "si" ? "සම්බන්ධතා" : "Contact"}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>{SITE.location}</li>
              <li><a className="hover:text-primary" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><a className="hover:text-primary" href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a></li>
              <li><a className="hover:text-primary" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp: {SITE.whatsappDisplay}</a></li>
              <li>{SITE.domain}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Not a bank, finance company, loan provider, deposit-taking institution, or investment return provider. Registration does not guarantee participation in any cheetu group or any financial outcome. Terms and conditions apply.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            © 2026 {SITE.company}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}