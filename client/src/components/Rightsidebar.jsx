import wolf from "../assets/icons/wolf.svg";
import wolfpack from "../assets/icons/wolfpack.svg";
import { Link } from "react-router-dom";

export default function Rightsidebar({ following }) {
  return (
    <div className="hidden lg:block flex flex-col p-4 border-2 border-[#636363] border-dotted border-silver lg: gap-1 font-doggy bg-gradient-to-bl from-[#ACE1AF] via-[#99D49F] to-[#82C88F]">
      <div className="flex items-center gap-2 mb-2">
        <img className="w-[1.5em] h-[1.5em]" src={wolf} alt="" />
        <h1 className="text-lg md:text-xl lg:text-2xl">Your Pack </h1>
      </div>
      {following.map((relation) => (
        <Link to={`/user/${relation.followed.id}`}>
          <button className="flex items-center gap-2 text-left text-md md:text-lg lg:text-xl px-4 py-2 rounded hover:text-[#366B40]">
            <img className="w-[1em] h-[1em]" src={wolfpack} alt="" />
            <em>{relation.followed.username}</em>
          </button>
        </Link>
      ))}
    </div>
  );
}
