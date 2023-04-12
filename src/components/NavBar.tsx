import Link from "next/link";
import { useState } from "react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex items-center justify-between flex-wrap bg-blue-100 p-6">
      <Link href="/">
        <div className="flex items-center flex-shrink-0 text-white mr-6 hover:text-gray-600">
          {/* <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg> */}
          <p className="font-semibold text-xl text-black tracking-tight hover:text-gray-600">
            LiveXchange
          </p>
        </div>
      </Link>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-gray-600 hover:border-gray-600"
          onClick={toggleMenu}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <div className="text-sm lg:flex-grow">
          <Link
            href="/aboutProject"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-600 mr-4"
          >
            About this Project
          </Link>
          <Link href="/aboutMe">
            <p className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-600">
              About Me
            </p>
          </Link>
          {/* <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-600"
          >
            Blog
          </a> */}
        </div>
        <div>
          <Link
            href="/bookings"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-gray-600 hover:text-gray-600 hover:bg-white mt-4 lg:mt-0"
          >
            Book a Call
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
