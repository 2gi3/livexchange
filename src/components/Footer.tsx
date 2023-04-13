import Feedback from "./Feedback";
import Image from "next/image";

function Footer() {
  return (
    <footer className="w-full flex flex-col sm:flex-row justify-center gap-6 mt-11 py-11 bg-blue-100 items-center">
      <Feedback />
      <div className="border border-gray-400 bg-white rounded flex h-[130px] w-[306px]">
        <div className=" flex justify-center items-center pr-3 ">
          <Image
            width={120}
            height={130}
            src="/profilePic120_130.webp"
            alt="Website creator"
          />
        </div>
        <div className="  p-3 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <p className="text-xs text-gray-600 flex items-center">
              Website by:
            </p>
            <div className="text-gray-900 font-bold mb-2 text-l">
              Giuseppe Ippolito
            </div>
            <p className="text-gray-700 text-sm ">Typesctipt Developer</p>
            <p className="text-xs text-gray-600">London, UK</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
