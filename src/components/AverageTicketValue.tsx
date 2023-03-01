import { AverageTicketValueProp } from "@/types";

function AverageTicketValue({ average }: AverageTicketValueProp) {
  return (
    <div className="mx-auto inline-block text-center">
      <h1>BTC/USD</h1>
      <h3>Average Ticket Value</h3>
      <p>{average}</p>
    </div>
  );
}

export default AverageTicketValue;
