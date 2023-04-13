function aboutMe() {
  return (
    <div>
      <ul className="flex flex-wrap justify-evenly font-semibold gap-baseS p-base pb-11 max-w-xl mx-auto">
        <li>Next.js</li>
        <li>React</li>
        <li>TypeScript</li>
        <li>Javascript</li>
        <li>Redux</li>
        <li>D3.js</li>
      </ul>
      <ul className="flex flex-wrap justify-evenly font-semibold gap-baseS px-base pb-11 max-w-xl mx-auto">
        <li>Tailwind</li>
        <li>Bootstrap</li>
        <li>SCSS</li>
        <li>Styled Components</li>
        <li>Figma</li>
      </ul>
      <ul className="flex flex-wrap justify-evenly font-semibold gap-baseS px-base pb-11 max-w-xl mx-auto">
        <li>Node.js</li>
        <li>Express</li>
        <li>SQL</li>
        <li>MongoDB</li>
      </ul>
      <ul className="flex flex-wrap justify-evenly font-semibold gap-baseS px-base pb-11 max-w-xl mx-auto">
        <li>Jest</li>
        <li>Cypress</li>
        <li>CI/CD</li>
      </ul>
      <div>
        <h3>Work experience</h3>
      </div>
      <div>
        <h3>Education</h3>
      </div>
      <div className="flex flex-wrap justify-start px-base max-w-xl mx-auto">
        <a
          href="https://github.com/2gi3"
          target="blank"
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-gray-600 hover:text-gray-600 hover:bg-white  mt-11 "
        >
          My Github
        </a>
      </div>
    </div>
  );
}

export default aboutMe;
