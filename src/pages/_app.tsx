import { PairContext } from "@/context/pairContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [secectedPair, setSelectedPAir] = useState("BTC/USD");
  return (
    <PairContext.Provider value={{ secectedPair, setSelectedPAir }}>
      <Component {...pageProps} />
    </PairContext.Provider>
  );
}
