import { KeyValueDisplayerProps } from "../types";

function KeyValueDisplayer({ objectKey, value }: KeyValueDisplayerProps) {
  return (
    <div className="w-full flex justify-between items-center my-5  border-b border-gray">
      <p>{objectKey}</p>
      <p>{value}</p>
    </div>
  );
}

export default KeyValueDisplayer;
