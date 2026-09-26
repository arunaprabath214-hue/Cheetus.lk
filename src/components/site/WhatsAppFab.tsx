import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";
import { useLang } from "@/lib/i18n";

export function WhatsAppFab() {
  const { t } = useLang();
  return (
    <a
      href={`https://wa.me/${SITE.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("waFab")}
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-elegant transition-transform hover:scale-[1.05] sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">{t("waFab")}</span>
    </a>
  );
}