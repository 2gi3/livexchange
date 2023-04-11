import { InfoProps } from "@/types";

const Info = ({ children, route, info }: InfoProps) => {
  return (
    <div className="border round border-grey-600 p-2 m-11">
      <p className="font-bold">{route}</p>
      <p>{info}</p>
      <div className="flex justify-center">{children}</div>
    </div>
  );
};

export default Info;
