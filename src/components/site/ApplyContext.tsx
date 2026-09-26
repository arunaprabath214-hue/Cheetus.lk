import { createContext, useContext, useState, type ReactNode } from "react";

type Ctx = { open: boolean; setOpen: (v: boolean) => void };
const ApplyContext = createContext<Ctx | null>(null);

export function ApplyProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <ApplyContext.Provider value={{ open, setOpen }}>{children}</ApplyContext.Provider>;
}

export function useApply() {
  const ctx = useContext(ApplyContext);
  if (!ctx) throw new Error("useApply must be used within ApplyProvider");
  return ctx;
}