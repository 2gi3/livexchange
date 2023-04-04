//  External packages and Next.js components
import Head from "next/head";
import { useContext } from "react";

//Internal components and context
import AverageTicketValue from "@/components/AverageTicketValue";
import BiggestMoversChart from "@/components/BiggestMoversChart";
import ButtonsContainer from "@/components/ButtonsContainer";
import PairValues from "@/components/PairValues";
import { PairContext } from "@/context/pairContext";
import backupButtons from "../backupButtons.json";

// Types and functions
import { calculateAverageLast, mapValuesToNumber } from "@/functions";
import { Buttons, TickerData, Last, BTCtoOthers } from "@/types";

export const getServerSideProps = async () => {
  const bitfinex = process.env.NEXT_PUBLIC_BITFINEX_URL;
  const bitstamp = process.env.NEXT_PUBLIC_BITSTAMP_URL;
  const coinbase = process.env.NEXT_PUBLIC_COINBASE_URL;
  const buttons = process.env.NEXT_PUBLIC_BUTTONS_URL;

  let bitstampData: TickerData[] | null = null;
  let coinbaseBTCtoOthers: BTCtoOthers | null = null;
  let finexLast: Last | null = null;
  let buttonsData: Buttons = backupButtons.tradingPairs;

  try {
    let [bitstampData, finexLast, coinbaseBTCtoOthers, tradingPairs] =
      await Promise.all([
        fetch(bitstamp!)
          .then((res) => res.json())
          .then((json) => json.map(mapValuesToNumber)),
        fetch(bitfinex!)
          .then((res) => res.json())
          .then((json) => json[0][1]),
        fetch(coinbase!)
          .then((res) => res.json())
          .then((json) =>
            Object.entries(json.data.rates).reduce((acc: any, [key, value]) => {
              acc[key] = Number(value);
              return acc;
            }, {})
          ),
        fetch(buttons!)
          .then((res) => res.json())
          .then((json) => json.map((pair: any) => pair.name)),
      ]);

    return {
      props: {
        bitstampData,
        finexLast,
        coinbaseBTCtoOthers,
        tradingPairs,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        bitstampData,
        finexLast,
        coinbaseBTCtoOthers,
        tradingPairs: buttonsData,
      },
    };
  }
};

export default function Home({
  bitstampData,
  coinbaseBTCtoOthers,
  finexLast,
  tradingPairs,
}: {
  bitstampData: TickerData[] | null;
  coinbaseBTCtoOthers: BTCtoOthers | null;
  finexLast: Last | null;
  tradingPairs: Buttons;
}) {
  const { secectedPair } = useContext(PairContext);
  const secectedPairValues = bitstampData?.find((obj) => {
    return obj.pair === secectedPair;
  });
  const bitstampBtcUsd = bitstampData?.find((obj) => obj.pair === "BTC/USD");
  const coinbaseBtcUsd = coinbaseBTCtoOthers
    ? Number(coinbaseBTCtoOthers["USD"])
    : null;

  const average = calculateAverageLast(
    bitstampBtcUsd?.last,
    coinbaseBtcUsd,
    Number(finexLast)
  );

  const BiggestMoversAll = bitstampData?.sort((a, b) => {
    const aPercentChange = Math.abs(a.percent_change_24);
    const bPercentChange = Math.abs(b.percent_change_24);
    return bPercentChange - aPercentChange;
  });
  const BiggestMovers = BiggestMoversAll
    ? BiggestMoversAll.slice(0, 3).map(({ pair, percent_change_24 }) => ({
        pair,
        percent_change_24,
      }))
    : null;

  return (
    <>
      <Head>
        <title>LiveXchange</title>
        <meta name="description" content="live currency pairs data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col md:flex-row justify-evenly max-w-[1200px] mx-auto">
        <div className="flex flex-col justify-center items-center md:justify-start">
          <AverageTicketValue
            average={average}
            change24={bitstampBtcUsd?.percent_change_24}
          />
          {BiggestMovers ? (
            <BiggestMoversChart biggestMovers={BiggestMovers} />
          ) : (
            <div>
              <p>
                The &quot;Biggest Movers&quot; chart is not available at the
                moment
              </p>
            </div>
          )}
        </div>
        <div className="m-8 pt-baseS md:pt-baseXS flex  justify-center items-center flex-col separatedBox">
          <ButtonsContainer pairs={tradingPairs} />
          {secectedPairValues ? (
            <PairValues values={secectedPairValues} />
          ) : (
            <h3>
              Sorry, the values for this trading pair are not available at the
              moment
            </h3>
          )}
        </div>
      </main>
    </>
  );
}
