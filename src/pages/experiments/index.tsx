import AverageTicketValue from "../../components/AverageTicketValue";
import { calculateAverageLast } from "../../functions";
import { Buttons, TickerData, Last, BTCtoOthers } from "../../types";
import Head from "next/head";
import PairValues from "../../components/PairValues";
import { useContext } from "react";
import { PairContext } from "../../context/pairContext";

export const getServerSideProps = async () => {
  let bitstampData: TickerData[] | null = null;
  let coinbaseBTCtoOthers: BTCtoOthers | null = null;
  let finexLast: Last | null = null;
  let buttonsData: Buttons = [
    "TES/TTT",
    "BTC/USD",
    "BTC/EUR",
    "BTC/GBP",
    "BTC/JPY",
    "BTC/KRW",
  ];

  try {
    let [bitstampData, finexLast, coinbaseBTCtoOthers, tradingPairs] =
      await Promise.all([
        fetch("https://www.bitstamp.net/api/v2/ticker/")
          .then((res) => res.json())
          .then((json) =>
            json.map((obj: any) => {
              return {
                ...obj,
                timestamp: Number(obj.timestamp),
                open: Number(obj.open),
                high: Number(obj.high),
                low: Number(obj.low),
                last: Number(obj.last),
                volume: Number(obj.volume),
                vwap: Number(obj.vwap),
                bid: Number(obj.bid),
                ask: Number(obj.ask),
                open_24: Number(obj.open_24),
                percent_change_24: Number(obj.percent_change_24),
              };
            })
          ),
        fetch("https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD")
          .then((res) => res.json())
          .then((json) => json[0][1]),
        fetch("https://api.coinbase.com/v2/exchange-rates?currency=BTC")
          .then((res) => res.json())
          .then((json) =>
            Object.entries(json.data.rates).reduce((acc: any, [key, value]) => {
              acc[key] = Number(value);
              return acc;
            }, {})
          ),
        fetch("https://www.bitstamp.net/api/v2/trading-pairs-info/")
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

export default function Experiment1({
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
  const bitstampBtcUsd = bitstampData?.find((obj) => obj.pair === "BTC/USD");
  const coinbaseBtcUsd = coinbaseBTCtoOthers
    ? Number(coinbaseBTCtoOthers["USD"])
    : null;

  const average = calculateAverageLast(
    bitstampBtcUsd?.last,
    coinbaseBtcUsd,
    Number(finexLast)
  );

  const { secectedPair, setSelectedPAir } = useContext(PairContext);

  const secectedPairValues = bitstampData?.find((obj) => {
    return obj.pair === secectedPair;
  });

  return (
    <>
      <Head>
        <title>LiveXchange</title>
        <meta name="description" content="live currency pairs data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col md:flex-row">
        <div className=" w-full flex flex-col justify-center items-center">
          <AverageTicketValue average={average} />
        </div>
        <div>
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
