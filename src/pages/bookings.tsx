import Calendly from "@/components/Calendly";

function Bookings() {
  return (
    <main>
      <div className="mt-12 pt-2 px-11 gap-baseS  mx-auto flex flex-wrap flex-col justify-center items-start max-w-[488px] gap=baseS">
        <p
          className="text-sm text-gray-600 mb-[-22px]"
          // className="font-bold text-xl text-center w-full"
        >
          Let's have a chat!
        </p>
        <h1 className="font-bold text-l">Book a 45 minutes interview</h1>
        <p>
          I can walk you through my code or show you other projects and my
          skills
        </p>

        <p className="tablet:mb-0 mb-12">
          I'm looking forward to speaking with you soon!
        </p>
      </div>
      <Calendly />
    </main>
  );
}

export default Bookings;
