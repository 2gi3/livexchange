import { Buttons } from "@/types";
import Head from "next/head";

export const getServerSideProps = async () => {
  let bitstampData = null;
  let coinbaseData = null;
  let finexData = null;
  let buttonsData: Buttons = [
    "TES/TTT",
    "BTC/USD",
    "BTC/EUR",
    "BTC/GBP",
    "BTC/JPY",
    "BTC/KRW",
  ];

  try {
    let [bitstampData, finexData, coinbaseData, tradingPairs] =
      await Promise.all([
        fetch("https://www.bitstamp.net/api/v2/ticker/").then((res) =>
          res.json()
        ),
        fetch("https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD").then(
          (res) => res.json()
        ),
        fetch("https://api.coinbase.com/v2/exchange-rates?currency=BTC").then(
          (res) => res.json()
        ),
        fetch("https://www.bitstamp.net/api/v2/trading-pairs-info/").then(
          (res) => res.json().then((json) => json.map((pair: any) => pair.name))
        ),
      ]);

    return {
      props: {
        bitstampData,
        finexData,
        coinbaseData,
        tradingPairs,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        bitstampData,
        finexData,
        coinbaseData,
        tradingPairs: buttonsData,
      },
    };
  }
};

export default function Home({
  bitstampData,
  coinbaseData,
  finexData,
  tradingPairs,
}: {
  bitstampData: any;
  coinbaseData: any;
  finexData: any;
  tradingPairs: Buttons;
}) {
  console.log(tradingPairs);
  return (
    <>
      <Head>
        <title>LiveXchange</title>
        <meta name="description" content="live currency pairs data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col md:flex-row">
        <div className="bg-red-600 w-full">
          <h1>hello world</h1>
        </div>
        <div className="bg-blue-600 w-full">
          <h2>what the world</h2>
        </div>
      </main>
    </>
  );
}
