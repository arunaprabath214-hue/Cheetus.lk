import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "si" | "en";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof DICT) => string };

const Context = createContext<Ctx | null>(null);

export const DICT = {
  pvBadge: { si: "ශ්‍රී ලංකාවේ ලියාපදිංචි සමාගමක් · PV 00279330", en: "Registered in Sri Lanka · PV 00279330" },
  heroTitle: { si: "අපේ රටේ කර්මාන්තත්, දේශීය ව්‍යාපාරත් එකට දියුණු කරමු.", en: "Let’s help Sri Lankan industries and local businesses grow together." },
  heroSub: {
    si: "Cheetus චීට්ටු වැඩසටහනත් ක්‍රියාත්මක කරනවා. ඒ වගේම, ශ්‍රී ලංකාවේ කර්මාන්ත සහ දේශීය ව්‍යාපාර ඉදිරියට ගෙන යාමටත් අපි කැපවී සිටිනවා.",
    en: "Cheetus runs a cheetu programme and is also committed to helping Sri Lankan industries and local businesses move forward.",
  },
  getStarted: { si: "අප හා සම්බන්ධ වන්න", en: "Get in Touch" },
  skipIntro: { si: "මග හරින්න", en: "Skip intro" },
  howItWorks: { si: "සීට්ටු වැඩසටහන ගැන", en: "About the Cheetu Programme" },
  applyNow: { si: "ලියාපදිංචි වන්න", en: "Register" },

  benefitsTitle: { si: "අපි කටයුතු කරන ආකාරය", en: "How We Work" },
  benefit1: { si: "ලියාපදිංචි වීමේදී අවශ්‍ය තොරතුරු පැහැදිලිව ලබාදීම", en: "Clear information during registration" },
  benefit2: { si: "අවශ්‍ය ලේඛන සහ KYC ක්‍රියාවලිය", en: "Required documents and KYC process" },
  benefit3: { si: "ගෙවීම් තහවුරු කිරීම සහ රිසිට්පත්/ඉන්වොයිස් පිළිබඳ පැහැදිලි තොරතුරු", en: "Clear payment confirmation and invoice information" },
  benefit4: { si: "දුරකථන, WhatsApp සහ විද්‍යුත් තැපෑලෙන් සහාය", en: "Support by phone, WhatsApp, and email" },
  benefit5: { si: "ඉදිරියේදී online member status access පහසුකම්", en: "Future online member status access" },
  benefitsMicro: {
    si: "ඔබගේ ඉල්ලීම ලැබුණු පසු, අපගේ කණ්ඩායම තොරතුරු පරීක්ෂා කර ඊළඟ පියවර පැහැදිලි කරනු ඇත.",
    en: "After receiving your inquiry, our team will review the details and explain the next steps.",
  },

  step1: { si: "මූලික තොරතුරු", en: "Basic Details" },
  step2: { si: "අවශ්‍යතාවය", en: "Requirement" },
  step3: { si: "ලේඛන උඩුගත කිරීම", en: "Upload Documents" },
  step4: { si: "ගාස්තු හා එකඟතාව", en: "Fee & Consent" },

  fullName: { si: "සම්පූර්ණ නම", en: "Full Name" },
  nic: { si: "ජාතික හැඳුනුම්පත් අංකය", en: "NIC Number" },
  phone: { si: "දුරකථන අංකය", en: "Phone Number" },
  email: { si: "විද්‍යුත් තැපෑල", en: "Email Address" },
  district: { si: "දිස්ත්‍රික්කය", en: "District" },
  address: { si: "ලිපිනය", en: "Address" },
  monthlyAbility: { si: "මාසිකව ගෙවිය හැකි මුදල", en: "Monthly Payment Ability" },
  amountGoal: { si: "අවශ්‍ය මුදල", en: "Required Amount" },
  startTime: { si: "ආරම්භ කිරීමට කැමති කාලය", en: "Preferred Start Time" },
  message: { si: "පණිවිඩය / අවශ්‍යතාවය", en: "Message / Requirement" },

  nicFront: { si: "ජාතික හැඳුනුම්පතේ ඉදිරිපස", en: "NIC Front" },
  nicBack: { si: "ජාතික හැඳුනුම්පතේ පිටුපස", en: "NIC Back" },
  addressProof: { si: "ලිපිනය තහවුරු කරන ලේඛනය (අත්‍යවශ්‍ය නැත)", en: "Address Proof (optional)" },
  otherDoc: { si: "වෙනත් ලේඛනයක් (අත්‍යවශ්‍ය නැත)", en: "Other Document (optional)" },
  uploadHint: { si: "PDF, JPG, PNG · උපරිම 6MB", en: "PDF, JPG, PNG · Max 6MB" },
  uploadFailMsg: {
    si: "ලේඛනය උඩුගත කිරීමට නොහැකි වුණා. ඔබට ඉදිරියට යා හැකියි. අපගේ කණ්ඩායම සම්බන්ධ වූ පසු WhatsApp හරහා ලේඛන එවිය හැකියි.",
    en: "Document upload failed. You can continue and send documents through WhatsApp after our team contacts you.",
  },
  sendViaWa: { si: "WhatsApp හරහා ලේඛන එවන්න", en: "Send Documents via WhatsApp" },

  feeNotice: { si: "ලියාපදිංචිය සහ KYC ලේඛන සැකසීම සඳහා එක් වරක් අය කරන ගාස්තුව: රු. 1,000", en: "One-time registration & KYC processing fee: Rs. 1,000" },
  paymentNote: {
    si: "ගෙවීම තහවුරු කිරීම WhatsApp හරහා සිදු කරයි. ගෙවීම තහවුරු වූ පසු ඉන්වොයිසියක් නිකුත් කරනු ලැබේ.",
    en: "Payment confirmation is handled via WhatsApp. After confirmation, an invoice will be issued.",
  },
  consent1: { si: "මම ලබාදුන් තොරතුරු සත්‍ය සහ නිවැරදි බව තහවුරු කරමි.", en: "I confirm that the information provided is true and accurate." },
  consent2: {
    si: "රු. 1,000 ගාස්තුව ලියාපදිංචිය, KYC, ලේඛන සැකසීම සහ පරිපාලන කටයුතු සඳහා පමණක් බව මට අවබෝධයි.",
    en: "I understand that the Rs.1,000 fee is for registration, KYC, document processing, and administration only.",
  },
  consent3: {
    si: "ලියාපදිංචි වීමෙන් සීට්ටු කණ්ඩායමකට ඇතුළත් වීම හෝ මූල්‍ය ප්‍රතිඵලයක් ලැබීම සහතික නොවන බව මට අවබෝධයි.",
    en: "I understand that registration does not guarantee participation in any cheetu group or any financial outcome.",
  },
  consent4: { si: "නියමයන් සහ කොන්දේසි හා පෞද්ගලිකත්ව දැනුම්දීමට මම එකඟ වෙමි.", en: "I agree to the Terms & Conditions and Privacy Notice." },

  continueWa: { si: "WhatsApp හරහා ඉදිරියට යන්න", en: "Continue via WhatsApp" },
  next: { si: "ඊළඟට", en: "Next" },
  back: { si: "ආපසු", en: "Back" },

  thankTitle: { si: "ඔබගේ ලියාපදිංචි ඉල්ලීම සකස් කර අවසන්", en: "Your registration request has been prepared successfully" },
  thankMsg: {
    si: "කරුණාකර WhatsApp chat එක තුළ සකස් කර ඇති පණිවිඩය යවන්න. අපගේ කණ්ඩායම ඔබව සම්බන්ධ කරගෙන ගෙවීම් තහවුරු කිරීම සහ ඉන්වොයිසිය ලබාදීම ගැන පැහැදිලි කරනු ඇත.",
    en: "Please send the prepared WhatsApp message. Our team will contact you and guide you through payment confirmation and invoice issuance.",
  },
  openWa: { si: "WhatsApp නැවත විවෘත කරන්න", en: "Open WhatsApp Again" },
  backHome: { si: "මුල් පිටුවට යන්න", en: "Back to Home" },
  contactSupport: { si: "සහාය අමතන්න", en: "Contact Support" },
  waFab: { si: "Cheetus සමඟ WhatsApp හරහා කතා කරන්න", en: "Chat with Cheetus" },
} as const;

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("si");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cheetus.lang");
      if (saved === "si" || saved === "en") setLangState(saved);
    } catch {}
  }, []);
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("cheetus.lang", l); } catch {}
  };
  const t = (k: keyof typeof DICT) => DICT[k][lang];
  return <Context.Provider value={{ lang, setLang, t }}>{children}</Context.Provider>;
}

export function useLang() {
  const c = useContext(Context);
  if (!c) throw new Error("useLang must be used inside LanguageProvider");
  return c;
}