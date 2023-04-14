import Link from "next/link";

function aboutMe() {
  return (
    <div className="flex flex-col items-center">
      <div className="m-11 flex flex-wrap max-w-xl ">
        <div className="w-full font-semy-bold flex justify-center">
          <h1>My Skills:</h1>
        </div>
        <ul className="flex flex-wrap justify-evenly gap-baseXS p-base pb-11 max-w-xl mx-auto">
          <li>Next.js</li>
          <li>React</li>
          <li>TypeScript</li>
          <li>Javascript</li>
          <li>Redux</li>
          <li>D3.js</li>
        </ul>
        <ul className="flex flex-wrap justify-evenly  gap-baseXS px-base pb-11 max-w-xl mx-auto">
          <li>Tailwind</li>
          <li>Bootstrap</li>
          <li>SCSS</li>
          <li>Styled Components</li>
          <li>Figma</li>
        </ul>
        <ul className="flex flex-wrap justify-evenly  gap-baseXS px-base pb-11 max-w-xl mx-auto">
          <li>Node.js</li>
          <li>Express</li>
          <li>SQL</li>
          <li>MongoDB</li>
        </ul>
        <ul className="flex flex-wrap justify-evenly gap-baseXS px-base pb-11 max-w-xl mx-auto">
          <li>Jest</li>
          <li>Cypress</li>
          <li>CI/CD</li>
        </ul>
      </div>
      <div className="m-11 flex flex-wrap max-w-xl ">
        <h2>Work experience</h2>
        <ul>
          <li>
            <h3 className="font-semibold pt-baseXS">
              Freelance Web-Developer (2 years)
            </h3>
            I have experience working on big projects as a part of a team and
            also taking up small projects alone, Please{" "}
            <Link href="bookings" className="text-blue-500 underline">
              book a call
            </Link>{" "}
            if you would like to know more and see some code i have written
            which is not on my{" "}
            <a
              href="https://github.com/2gi3"
              target="blank"
              className="text-blue-500 underline"
            >
              my Github
            </a>
          </li>
          <li>
            <h3 className="font-semibold pt-baseXS">
              IKEA Croydon - sales Team-Leader (5 years)
            </h3>
          </li>
          <li>
            <h3 className="font-semibold pt-baseXS">
              Private Tutor (part time) - English language for Thai students (9
              years)
            </h3>
          </li>
          <li>
            <h3 className="font-semibold pt-baseXS">
              Real Estate Agent - Toscano Casa SPA, Italy (5 years)
            </h3>
          </li>
        </ul>
      </div>
      <div className="m-11 flex flex-wrap max-w-xl ">
        <h2>Education</h2>
        <ul>
          <li>
            <h3 className="font-semibold pt-baseXS">
              OpenClassrooms - Web-Developer Associate's-level diploma
              (graduated 05/2022)
            </h3>
            <p>
              I studied with a menthor for 7 months, learned the baasics of
              coding, completed and deployed 7 projects and was student of the
              month once
            </p>
          </li>
          <li>
            <h3 className="font-semibold pt-baseXS">High-School</h3>I graduated
            in Italy 15 years ago
          </li>
        </ul>
      </div>
      <div className="flex flex-wrap justify-start px-base max-w-xl mx-auto">
        <a
          href="https://github.com/2gi3"
          target="blank"
          className="inline-block text-sm px-4 py-2 leading-none bg-blue-100 border rounded text-black border-black hover:border-gray-600 hover:text-gray-600 hover:bg-white  mt-11 "
        >
          My Github
        </a>
      </div>
    </div>
  );
}

export default aboutMe;
