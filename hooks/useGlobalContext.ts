import { useContext } from "react";
import { GlobalContext } from "@/components/GlobalProvider";

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobalContext must be used within GlobalProvider");
  return context;
}
