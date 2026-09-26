// Easy-to-edit site constants
export const SITE = {
  company: "Cheetus Investment Industrial Development (PVT) LTD",
  shortName: "Cheetus",
  pv: "PV 00279330",
  domain: "www.cheetus.lk",
  email: "info@cheetus.lk",
  phone: "081 316 9160",
  phoneTel: "+94813169160",
  whatsapp: "94703169160", // digits only for wa.me link
  whatsappDisplay: "070 316 9160",
  location: "Nugawela, Kandy, Sri Lanka",
} as const;

export const NAV = [
  { label: "Home", labelSi: "මුල් පිටුව", href: "#home" },
  { label: "About", labelSi: "අප ගැන", href: "#about" },
  { label: "Membership", labelSi: "සාමාජිකත්වය", href: "#membership" },
  { label: "Process", labelSi: "ක්‍රියාවලිය", href: "#process" },
  { label: "Documents", labelSi: "ලේඛන", href: "#documents" },
  { label: "Notice", labelSi: "දැන්වීම", href: "#notice" },
  { label: "Contact", labelSi: "සම්බන්ධතා", href: "#contact" },
];

export const DISTRICTS = [
  "Ampara","Anuradhapura","Badulla","Batticaloa","Colombo","Galle","Gampaha",
  "Hambantota","Jaffna","Kalutara","Kandy","Kegalle","Kilinochchi","Kurunegala",
  "Mannar","Matale","Matara","Monaragala","Mullaitivu","Nuwara Eliya","Polonnaruwa",
  "Puttalam","Ratnapura","Trincomalee","Vavuniya",
];

export const PAYMENT_ABILITY = [
  "Rs. 2,500 - Rs. 5,000",
  "Rs. 5,000 - Rs. 10,000",
  "Rs. 10,000 - Rs. 25,000",
  "Rs. 25,000 - Rs. 50,000",
  "Above Rs. 50,000",
];

export const AMOUNT_GOAL = [
  "Rs. 50,000",
  "Rs. 100,000",
  "Rs. 250,000",
  "Rs. 500,000",
  "Rs. 1,000,000",
  "Above Rs. 1,000,000",
];

export const START_TIME = [
  "Immediately",
  "Within 1 month",
  "Within 3 months",
  "Within 6 months",
  "Just exploring",
];

export const MAX_FILE_SIZE = 6 * 1024 * 1024; // 6MB
export const ALLOWED_MIME = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];