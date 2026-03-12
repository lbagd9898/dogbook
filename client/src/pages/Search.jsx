import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import Rightsidebar from "../components/Rightsidebar";
import pawprint from "../assets/icons/pawprint.svg";
import wolfpack from "../assets/icons/wolfpack.svg";

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  function handleSearch() {
    setSubmittedQuery(query);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userSearch", submittedQuery],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/user/search?username=${submittedQuery}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Search failed");
      return res.json();
    },
    enabled: !!submittedQuery,
  });

  return (
    <div className="grid grid-cols-[4em_1fr] md:grid-cols-[12rem_1fr] lg:grid-cols-[16rem_1fr_14rem] min-h-screen">
      <Navbar />
      <main className="relative p-6 flex flex-col items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 via-gray-200 overflow-y-auto">
        <div className="flex flex-col gap-6 w-full max-w-xl">
          {/* Header */}
          <div className="flex gap-2 items-center font-doggy">
            <h1 className="text-xl lg:text-2xl">User Search</h1>
            <img className="w-[1.5em] h-[1.5em]" src={pawprint} alt="" />
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a user..."
              className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 shadow-md bg-white focus:outline-none focus:border-[#82C88F] transition-all duration-150"
            />
            <button
              onClick={handleSearch}
              className="bg-[#82C88F] px-2 py-1 shadow-md rounded-lg border-2 border-black hover:bg-[#6fb97c] hover:shadow-lg active:scale-95 transition-all duration-150 ease-out font-doggy"
            >
              Search
            </button>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-3">
            {isLoading && (
              <p className="font-doggy text-gray-500">Searching...</p>
            )}
            {isError && (
              <p className="font-doggy text-red-500">Something went wrong.</p>
            )}
            {data?.users?.map((user) => (
              <div
                key={user.id}
                onClick={() => navigate(`/user/${user.id}`)}
                className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:border-[#82C88F] transition-all duration-150 cursor-pointer"
              >
                <img
                  src={user.picUrl || wolfpack}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                />
                <span className="font-doggy text-gray-800">
                  {user.username}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Rightsidebar />
    </div>
  );
}
