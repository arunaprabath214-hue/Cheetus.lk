import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "si" | "en";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof DICT) => string };

const Context = createContext<Ctx | null>(null);

export const DICT = {
  // hero
  pvBadge: { si: "ශ්‍රී ලංකාවේ ලියාපදිංචි · PV 00279330", en: "Registered in Sri Lanka · PV 00279330" },
  heroTitle: { si: "ඔබගේ මූල්‍ය ඉලක්කයට විධිමත් සාමාජික ක්‍රියාවලියක්", en: "A Structured Member Process for Your Financial Goal" },
  heroSub: {
    si: "ලියාපදිංචිය, KYC ලේඛන ක්‍රියාවලිය සහ විධිමත් සාමාජික සීට්ටු කළමනාකරණ සහාය එකම තැනකින්.",
    en: "Member registration, KYC documentation, and structured cheetu management support in one organized platform.",
  },
  getStarted: { si: "සම්බන්ධ වන්න", en: "Get Started" },
  skipIntro: { si: "මග හරින්න", en: "Skip intro" },
  howItWorks: { si: "ක්‍රියාවලිය", en: "How It Works" },
  applyNow: { si: "ලියාපදිංචි වන්න", en: "Apply Now" },

  // benefits
  benefitsTitle: { si: "ලියාපදිංචි වීමෙන් ඔබට ලැබෙන දේ", en: "What You Get After Registration" },
  benefit1: { si: "ඔබට ගැලපෙන සාමාජික කණ්ඩායමක් හඳුනාගැනීමට සහාය", en: "Support to identify a suitable member group" },
  benefit2: { si: "KYC සහ ලේඛන ක්‍රියාවලිය", en: "KYC and documentation process" },
  benefit3: { si: "විධිමත් ගෙවීම් සහ invoice තහවුරු කිරීමේ process එක", en: "Structured payment confirmation and invoice process" },
  benefit4: { si: "දුරකථන, WhatsApp සහ Email හරහා සාමාජික සහාය", en: "Member support via phone, WhatsApp, and email" },
  benefit5: { si: "ඉදිරියේදී online member status access පහසුකම්", en: "Future online member status access" },
  benefitsMicro: {
    si: "ඔබගේ තොරතුරු ලබාදුන් පසු, අපගේ කණ්ඩායම ඔබගේ අවශ්‍යතාවය පරීක්ෂා කර ඉදිරි පියවර WhatsApp හරහා පැහැදිලි කරනු ඇත.",
    en: "After submitting your details, our team will review your requirement and explain the next step through WhatsApp.",
  },

  // form steps
  step1: { si: "මූලික තොරතුරු", en: "Basic Details" },
  step2: { si: "අවශ්‍යතාවය", en: "Requirement" },
  step3: { si: "ලේඛන උඩුගත කිරීම", en: "Document Upload" },
  step4: { si: "ගාස්තු හා එකඟතාව", en: "Fee & Consent" },

  fullName: { si: "සම්පූර්ණ නම", en: "Full Name" },
  nic: { si: "ජා.හැ.අංකය", en: "NIC Number" },
  phone: { si: "දුරකථන අංකය", en: "Phone Number" },
  email: { si: "Email", en: "Email Address" },
  district: { si: "දිස්ත්‍රික්කය", en: "District" },
  address: { si: "ලිපිනය", en: "Address" },
  monthlyAbility: { si: "මාසික ගෙවීමේ හැකියාව", en: "Monthly Payment Ability" },
  amountGoal: { si: "අවශ්‍ය මුදල් ඉලක්කය", en: "Required Amount Goal" },
  startTime: { si: "ආරම්භ කිරීමට කැමති කාලය", en: "Preferred Start Time" },
  message: { si: "පණිවිඩය / අවශ්‍යතාවය", en: "Message / Requirement" },

  nicFront: { si: "NIC ඉදිරිපස", en: "NIC Front" },
  nicBack: { si: "NIC පසුපස", en: "NIC Back" },
  addressProof: { si: "ලිපින සාක්ෂිය (අවශ්‍ය නැත)", en: "Address Proof (optional)" },
  otherDoc: { si: "වෙනත් ලේඛනයක් (අවශ්‍ය නැත)", en: "Other Supporting Document (optional)" },
  uploadHint: { si: "PDF, JPG, PNG · උපරිම 6MB", en: "PDF, JPG, PNG · Max 6MB" },
  uploadFailMsg: {
    si: "Document upload අසාර්ථකයි. ඔබට ඉදිරියට යා හැකි අතර, අපගේ කණ්ඩායම ඔබව සම්බන්ධ කරගත් පසු WhatsApp හරහා ලේඛන එවන්න.",
    en: "Document upload failed. You can continue and send documents through WhatsApp after our team contacts you.",
  },
  sendViaWa: { si: "WhatsApp හරහා ලේඛන එවන්න", en: "Send Documents via WhatsApp" },

  feeNotice: { si: "එක් වරක් අය වන ලියාපදිංචි හා KYC process fee: Rs.1000/=", en: "One-time registration & KYC processing fee: Rs.1,000" },
  paymentNote: {
    si: "ගෙවීම් තහවුරු කිරීම WhatsApp හරහා සිදු කරනු ලැබේ. තහවුරු කිරීමෙන් පසු invoice එකක් නිකුත් කරනු ලැබේ.",
    en: "Payment confirmation is handled via WhatsApp. After confirmation, an invoice will be issued.",
  },
  consent1: { si: "මම ලබාදුන් තොරතුරු සත්‍ය සහ නිවැරදි බව තහවුරු කරමි.", en: "I confirm that the information provided is true and accurate." },
  consent2: {
    si: "Rs.1000/= ගාස්තුව ලියාපදිංචි කිරීම, KYC, ලේඛන සැකසීම සහ පරිපාලන කටයුතු සඳහා පමණක් බව මට අවබෝධ වේ.",
    en: "I understand that the Rs.1,000 fee is for registration, KYC, document processing, and administration only.",
  },
  consent3: {
    si: "ලියාපදිංචියෙන් සීට්ටු කණ්ඩායමකට ඇතුළත් වීම හෝ කිසිදු financial outcome එකක් guarantee නොවන බව මට අවබෝධ වේ.",
    en: "I understand that registration does not guarantee participation in any cheetu group or any financial outcome.",
  },
  consent4: { si: "Terms & Conditions සහ Privacy Notice එකට මම එකඟ වෙමි.", en: "I agree to the Terms & Conditions and Privacy Notice." },

  continueWa: { si: "WhatsApp හරහා ඉදිරියට යන්න", en: "Continue via WhatsApp" },
  next: { si: "ඊළඟට", en: "Next" },
  back: { si: "ආපසු", en: "Back" },

  thankTitle: { si: "ඔබගේ ලියාපදිංචි ඉල්ලීම සාර්ථකව සකස් කර ඇත", en: "Your registration request has been prepared successfully" },
  thankMsg: {
    si: "ඔබගේ තොරතුරු අපගේ පද්ධතියට සුරක්ෂිතව සුරකින ලදී. කරුණාකර WhatsApp chat එක තුළින් message එක send කරන්න. අපගේ කණ්ඩායම ඔබව සම්බන්ධ කරගෙන payment confirmation සහ invoice process එක පැහැදිලි කරනු ඇත.",
    en: "Your details have been saved successfully. Please send the prepared WhatsApp message. Our team will contact you and guide you through payment confirmation and invoice issuance.",
  },
  openWa: { si: "WhatsApp නැවත විවෘත කරන්න", en: "Open WhatsApp Again" },
  backHome: { si: "මුල් පිටුවට", en: "Back to Home" },
  contactSupport: { si: "සහාය අමතන්න", en: "Contact Support" },

  waFab: { si: "Cheetus සමඟ chat කරන්න", en: "Chat with Cheetus" },
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