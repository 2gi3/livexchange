import Image from "next/image";

function Footer() {
  return (
    <footer className="w-full flex justify-center">
      <div className="border border-gray-400 bg-white rounded flex h-[130px]">
        <div className=" flex justify-center items-center">
          <Image
            width={120}
            height={130}
            src="/profilePic120_130.webp"
            alt="Website creator"
          />
        </div>
        <div className="  p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <p className="text-sm text-gray-600 flex items-center">
              Website by:
            </p>
            <div className="text-gray-900 font-bold text-xl mb-2">
              Giuseppe Ippolito
            </div>
            <p className="text-gray-700 text-base">Typesctipt Developer</p>
            <p className="text-sm text-gray-600">London, UK</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
