import { cheetusOfficialLogo } from "@/lib/cheetus-logo";

export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src={cheetusOfficialLogo}
      alt="Cheetus Investment Industrial Development (PVT) LTD logo"
      width={160}
      height={160}
      className={`${className} rounded-[24%] object-cover shadow-sm ring-1 ring-orange-100`}
      style={{ clipPath: "inset(0 round 24%)" }}
    />
  );
}
