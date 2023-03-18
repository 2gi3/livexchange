import { PairContextType } from "@/types";
import { createContext } from "react";

export const PairContext = createContext<PairContextType>({
  secectedPair: "",
  setSelectedPAir: () => {},
});
