import wolfpack from "../assets/icons/wolfpack.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function SuggestionsModal({ className = "lg:w-[40vw] xl:w-[50vw]", showPrompt = true }) {
  const queryClient = useQueryClient();
  const [followedIds, setFollowedIds] = useState(new Set());

  const { data, isLoading, isError } = useQuery({
    queryKey: ["suggestions"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/suggestions`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message);
      }
      return res.json();
    },
  });

  const { mutate: toggleFollow } = useMutation({
    mutationFn: async (userId) => {
      const followedByUser = followedIds.has(userId);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/toggle-follow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId, followedByUser }),
      });
      if (!res.ok) throw new Error("Failed to follow");
      return res.json();
    },
    onSuccess: (data, userId) => {
      setFollowedIds((prev) => {
        const next = new Set(prev);
        data.following ? next.add(userId) : next.delete(userId);
        return next;
      });
      if (data.following) {
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        }, 10000);
        queryClient.invalidateQueries({ queryKey: ["following"] });
      }
    },
  });

  const suggestions = data?.suggestions ?? [];

  return (
    <div className={`border-2 border-[#82C88F] rounded-md p-6 bg-gradient-to-br from-slate-50 to-slate-100 shadow-md font-doggy flex flex-col gap-4 ${className}`}>
      <h2 className="text-2xl text-[#82C88F]">Find Your Pack</h2>
      {showPrompt && <p className="text-gray-500 text-lg">Follow someone to get started!</p>}
      {isLoading && (
        <p className="text-center text-gray-400 italic">
          Loading suggestions...
        </p>
      )}
      {isError && (
        <p className="text-center text-red-500">Couldn't load suggestions.</p>
      )}
      {!isLoading && !isError && suggestions.length === 0 && (
        <p className="text-center text-gray-400 italic">No other users yet.</p>
      )}
      {suggestions.map((user) => (
        <div key={user.id} className="flex items-center justify-between gap-3 rounded p-2 hover:bg-gray-200">
          <Link
            to={`/user/${user.id}`}
            className="flex items-center gap-3 min-w-0 transition-colors duration-150 cursor-pointer"
          >
            <img
              className="w-[2.5em] h-[2.5em] rounded-full object-cover flex-shrink-0"
              src={user.picUrl || wolfpack}
              alt=""
            />
            <div className="flex flex-col min-w-0">
              <span className="text-lg truncate">{user.username}</span>
              {user.breed && (
                <em className="text-sm text-gray-500 truncate">{user.breed}</em>
              )}
            </div>
          </Link>
          <button
            onClick={() => toggleFollow(user.id)}
            className={`flex-shrink-0 px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base shadow-md rounded-lg border-2 transition-all duration-150 ease-out hover:shadow-lg active:scale-95 ${
              followedIds.has(user.id)
                ? "bg-gray-200 border-[#82C88F] hover:bg-gray-300"
                : "bg-[#82C88F] border-black hover:bg-[#6fb97c]"
            }`}
          >
            <span className="sm:hidden">{followedIds.has(user.id) ? "−" : "+"}</span>
            <span className="hidden sm:inline">{followedIds.has(user.id) ? "Unfollow" : "Follow"}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
