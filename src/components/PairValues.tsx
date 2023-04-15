import { useRouter } from "next/router";
import { formatTimestamp } from "../functions";
import { TickerData } from "../types";
import KeyValueDisplayer from "./KeyValueDisplayer";
import LineGraph from "./LineGraph";

function PairValues({ values }: { values: TickerData }) {
  const entries = Object.entries(values);
  const timestampEntry = entries.shift();
  const timestamp = timestampEntry ? timestampEntry[1] : 0;
  const formattedTimestamp = formatTimestamp(timestamp);

  const router = useRouter();
  const currentPath = router.asPath;
  console.log(currentPath);

  return (
    <div className=" w-60">
      <div className="mt-11 mb-5">
        BitStamp Ticket Values: {formattedTimestamp}
      </div>
      <h2 className=" my-5 text-center font-bold ">
        {values.pair}:{" "}
        <span
          className={`${
            values.percent_change_24 < 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          {values.last} ({values.percent_change_24})
        </span>
      </h2>
      <div>
        <div className=" flex justify-around items-center my-5 gap-5">
          <p>{values.low}</p>
          <p>Day&apos;s Range</p>
          <p>{values.high}</p>
        </div>
      </div>
      {entries.map(([key, value]) =>
        key === "percent_change_24" ||
        key === "pair" ||
        key === "last" ||
        key === "low" ||
        key === "high" ? null : (
          <KeyValueDisplayer key={key} objectKey={key} value={value} />
        )
      )}
      {currentPath === "/aboutProject" ? (
        <div className="mb-[-32px]">
          <p className="font-bold mt-11">@/components/LineGraph</p>
          <p className="text-red-600">
            Serverless function @pages/api/pairs_data/[pair]
          </p>
        </div>
      ) : (
        <></>
      )}
      <LineGraph initialValue={[{ timestamp: timestamp, last: values.last }]} />
    </div>
  );
}

export default PairValues;
