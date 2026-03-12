import wolf from "../assets/icons/wolf.svg";
import wolfpack from "../assets/icons/wolfpack.svg";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Rightsidebar() {
  const {
    data: following,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["following"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/dash/get-following", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch friends");
      const json = await res.json();
      return json.following;
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="hidden lg:flex flex-col p-4 border-2 border-[#636363] border-dotted gap-1 font-doggy bg-gradient-to-bl from-[#ACE1AF] via-[#99D49F] to-[#82C88F]">
      <div className="flex items-center gap-2 mb-2">
        <img className="w-[1.5em] h-[1.5em]" src={wolf} alt="" />
        <h1 className="text-lg md:text-xl lg:text-2xl">Your Pack</h1>
      </div>

      {isLoading && (
        <p className="text-sm text-[#366B40] italic px-2">Loading pack...</p>
      )}

      {isError && (
        <p className="text-sm text-red-500 italic px-2">{error.message}</p>
      )}

      {!isLoading && !isError && (!following || following.length === 0) && (
        <div className="flex flex-col items-center gap-2 mt-4 text-center px-2">
          <img className="w-12 h-12 opacity-40" src={wolfpack} alt="" />
          <p className="text-sm text-[#366B40] italic">Your pack is empty.</p>
          <p className="text-xs text-[#366B40] opacity-70">
            Follow some users to see them here!
          </p>
        </div>
      )}

      {following?.map((relation) => (
        <Link key={relation.id} to={`/user/${relation.id}`}>
          <button className="flex items-center gap-2 text-left text-md md:text-lg lg:text-xl px-4 py-2 rounded hover:text-[#366B40]">
            <img
              className="w-[1.5em] h-[1.5em] rounded-full"
              src={relation.picUrl || wolfpack}
              alt=""
            />
            <em>{relation.username}</em>
          </button>
        </Link>
      ))}
    </div>
  );
}
