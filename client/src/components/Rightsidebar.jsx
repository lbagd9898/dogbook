import wolf from "../assets/icons/wolf.svg";
import wolfpack from "../assets/icons/wolfpack.svg";

export default function Rightsidebar() {
  return (
    <div className="flex flex-col p-4 border-2 border-[#636363] border-dotted border-silver lg: gap-1 font-doggy bg-gradient-to-bl from-[#ACE1AF] via-[#99D49F] to-[#82C88F]">
      <div className="flex items-center gap-2 mb-2">
        <img className="w-[1.5em] h-[1.5em]" src={wolf} alt="" />
        <h1 className="text-lg md:text-xl lg:text-2xl">Your Pack </h1>
      </div>
      <button className="flex items-center gap-2 text-left text-md md:text-lg lg:text-xl px-4 py-2 rounded hover:text-[#366B40]">
        <img className="w-[1em] h-[1em]" src={wolfpack} alt="" />
        <em>One friend</em>
      </button>
      <button className="flex items-center gap-2 text-left text-md md:text-lg lg:text-xl px-4 py-2 rounded hover:text-[#366B40]">
        <img className="w-[1em] h-[1em]" src={wolfpack} alt="" />
        <em>Anot friend</em>
      </button>
    </div>
  );
}
