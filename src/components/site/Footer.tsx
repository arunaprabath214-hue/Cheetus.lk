import { Logo } from "./Logo";
import { NAV, SITE } from "@/lib/site";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { lang } = useLang();
  const si = lang === "si";
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
              {si
                ? "චීට්ටු වැඩසටහනට අදාළ සාමාජික ලියාපදිංචිය සහ පරිපාලන සහාය ලබාදෙන අතර, ශ්‍රී ලාංකීය කර්මාන්ත හා දේශීය ව්‍යාපාර දියුණුවට දායක වීමත් අපේ අරමුණයි."
                : "We provide member registration and administrative support for our cheetu programme, while aiming to contribute to the development of Sri Lankan industries and local businesses."}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-charcoal">{si ? "වෙබ් අඩවිය" : "Navigate"}</p>
            <ul className="mt-4 space-y-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {si ? n.labelSi : n.label}
                  </a>
                </li>
              ))}
              <li><a href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-primary">{si ? "නියමයන් සහ කොන්දේසි" : "Terms & Conditions"}</a></li>
              <li><a href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-primary">{si ? "පෞද්ගලිකත්ව දැනුම්දීම" : "Privacy Notice"}</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-charcoal">{si ? "සම්බන්ධතා" : "Contact"}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>{si ? "නුගවෙල, මහනුවර, ශ්‍රී ලංකාව" : SITE.location}</li>
              <li><a className="hover:text-primary" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><a className="hover:text-primary" href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a></li>
              <li><a className="hover:text-primary" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp: {SITE.whatsappDisplay}</a></li>
              <li>{SITE.domain}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {si
              ? "මෙය බැංකුවක්, මූල්‍ය සමාගමක්, ණය දෙන හෝ තැන්පතු භාරගන්නා ආයතනයක් නොවේ. ලියාපදිංචි වීමෙන් සීට්ටු කණ්ඩායමකට ඇතුළත් වීම හෝ මූල්‍ය ප්‍රතිඵලයක් ලැබීම සහතික නොවේ. අදාළ නියමයන් සහ කොන්දේසි බලපැවැත්වේ."
              : "Not a bank, finance company, loan provider, deposit-taking institution, or investment return provider. Registration does not guarantee participation in any cheetu group or any financial outcome. Terms and conditions apply."}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">© 2026 {SITE.company}. {si ? "සියලු හිමිකම් ඇවිරිණි." : "All Rights Reserved."}</p>
        </div>
      </div>
    </footer>
  );
}