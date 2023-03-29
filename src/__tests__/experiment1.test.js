import { render, screen } from "@testing-library/react";
import Experiment1 from "../pages/experiments/index";
import { calculateAverageLast } from "../functions";
import { PairContext } from "../context/pairContext";
import homepageProps from "./__mocks__/homepageProps.json";

const props = homepageProps;

// const props = {
//   bitstampData: [
//     {
//       pair: "BTC/USD",
//       last: 40000,
//     },
//   ],
//   finexLast: 50000,
//   coinbaseBTCtoOthers: {
//     USD: 42000,
//     EUR: 36000,
//     GBP: 31000,
//     JPY: 4600000,
//     KRW: 45000000,
//   },
//   tradingPairs: [
//     "TES/TTT",
//     "BTC/USD",
//     "BTC/EUR",
//     "BTC/GBP",
//     "BTC/JPY",
//     "BTC/KRW",
//   ],
// };

describe("Experiment1 page", () => {
  it("renders average ticket value correctly", () => {
    // console.log(props);
    const average = calculateAverageLast(
      props.bitstampData[0].last,
      Number(props.coinbaseBTCtoOthers["USD"]),
      Number(props.finexLast)
    );
    const secectedPair = "BTC/USD";

    render(
      <PairContext.Provider value={{ secectedPair, setSelectedPAir: () => {} }}>
        <Experiment1 {...props} />
      </PairContext.Provider>
    );

    const averageTicketValue = screen.getByTestId(
      "average-ticket-value"
    ).textContent;
    expect(averageTicketValue).toBe("27380.18");
    console.log(screen.debug());
  });
});
