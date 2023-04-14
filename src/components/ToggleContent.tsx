import { ToggleContentProps } from "@/types";
import { useState } from "react";

const ToggleContent = ({ children, button }: ToggleContentProps) => {
  const [showList, setShowList] = useState(false);

  const toggleList = () => {
    setShowList(!showList);
  };

  return (
    <div>
      <button
        onClick={toggleList}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {button}
      </button>
      <div
        className={`flex flex-wrap justify-evenly gap-baseS p-baseS ${
          showList ? "" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ToggleContent;
