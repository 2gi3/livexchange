import { InfoProps } from "@/types";

const Info = ({ children, route, info }: InfoProps) => {
  return (
    <div className="border round border-grey-600 p-2 max-w-[300px] m-11 overflow-visible">
      <p className="font-bold">{route}</p>
      <p className="text-red-600">{info}</p>
      <div className="flex justify-center">{children}</div>
    </div>
  );
};

export default Info;
