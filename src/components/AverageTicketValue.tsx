import { AverageTicketValueProp } from "../types";

function AverageTicketValue({ average, change24 }: AverageTicketValueProp) {
  const fontColor = change24 && change24 >= 0 ? "text-gain" : "text-loss";
  return (
    <div className="mx-auto my-11 inline-block text-center">
      <h1 className="font-bold">BTC/USD</h1>
      <p>Average Ticket Value</p>
      <p
        data-testid="average-ticket-value"
        className={`font-bold ${fontColor}`}
      >
        {average}
      </p>
    </div>
  );
}

export default AverageTicketValue;
