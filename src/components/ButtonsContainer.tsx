import { PairContext } from "@/context/pairContext";
import { Buttons } from "@/types";
import { useContext, useState } from "react";

function ButtonsContainer({ pairs }: { pairs: Buttons }) {
  const { secectedPair, setSelectedPAir } = useContext(PairContext);
  const [src, setSrc] = useState("");
  return (
    <>
      <div className="ButtonsContainerWidth h-64 overflow-y-scroll search flex flex-wrap ">
        <input
          className="w-60 h-11 mb-5 p-3 border-black border rounded-xl  "
          type="text"
          placeholder="Filter"
          onChange={(e) => setSrc(e.target.value)}
        />
        {pairs
          .filter((pair) => {
            if (src === "") {
              return pair;
            } else if (pair.toLowerCase().includes(src.toLocaleLowerCase())) {
              return pair;
            }
          })
          .map((pair) => {
            return (
              <button
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
