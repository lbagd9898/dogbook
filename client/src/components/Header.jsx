import pawprint from "../assets/icons/pawprint.svg";

export default function Header() {
  return (
    <>
      <div className="flex flex-col p-5 border-2 border-[#636363] border-dotted border-silver justify-center items-center gap-2 md:gap-4 lg:gap-6 font-doggy bg-gradient-to-bl from-[#ACE1AF] via-[#99D49F] to-[#82C88F]">
        <div className="flex gap-2">
          <h1 className="text-2xl md:text-4xl lg:text-5xl">Doggy Facebook</h1>
          <img src={pawprint} alt="" />
        </div>
        <h2 className="text-base md:text-lg lg:text-xl">
          A Facebook for dogs.
        </h2>
      </div>
    </>
  );
}
