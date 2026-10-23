import { cheetusOfficialLogo } from "@/lib/cheetus-logo";

export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src={cheetusOfficialLogo}
      alt="Cheetus Investment Industrial Development (PVT) LTD logo"
      width={80}
      height={80}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}