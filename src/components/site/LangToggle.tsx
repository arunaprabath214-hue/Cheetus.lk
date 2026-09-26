import { useLang } from "@/lib/i18n";

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const base =
    "px-2.5 py-1 text-xs font-semibold rounded-full transition-colors";
  return (
    <div className={`inline-flex items-center gap-1 rounded-full border border-border bg-card/70 p-0.5 ${className}`}>
      <button
        onClick={() => setLang("si")}
        className={`${base} ${lang === "si" ? "bg-gradient-primary text-primary-foreground" : "text-charcoal-soft hover:text-primary"}`}
        aria-pressed={lang === "si"}
      >
        සිංහල
      </button>
      <button
        onClick={() => setLang("en")}
        className={`${base} ${lang === "en" ? "bg-gradient-primary text-primary-foreground" : "text-charcoal-soft hover:text-primary"}`}
        aria-pressed={lang === "en"}
      >
        English
      </button>
    </div>
  );
}