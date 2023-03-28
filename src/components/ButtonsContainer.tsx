import { PairContext } from "../context/pairContext";
import { Buttons } from "../types";
import { useContext, useState } from "react";

function ButtonsContainer({ pairs }: { pairs: Buttons }) {
  const { secectedPair, setSelectedPAir } = useContext(PairContext);
  const [src, setSrc] = useState("");
  return (
    <>
      <input
        className=" h-11 mb-5 p-3 border-black border rounded-xl w-baseXL "
        type="text"
        placeholder="Filter"
        onChange={(e) => setSrc(e.target.value)}
      />
      <div className=" overflow-y-scroll search flex flex-wrap h-baseXL w-baseXL ">
        {pairs
          .filter((pair) => {
            if (src === "") {
              return pair;
            } else if (pair.toLowerCase().includes(src.toLocaleLowerCase())) {
              return pair;
            }
          })
          .map((pair, i) => {
            return (
              <button
                key={`${pair}-${i}`}
                className="primaryButton"
                onClick={() => setSelectedPAir(pair)}
              >
                {pair}
              </button>
            );
          })}
      </div>
    </>
  );
}

export default ButtonsContainer;
