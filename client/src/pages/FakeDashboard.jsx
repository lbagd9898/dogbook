import pawprint from "../assets/icons/pawprint.svg";
import wolfpack from "../assets/icons/wolfpack.svg";
import FakePost from "../components/FakePost";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function GuestNavbar() {
  return (
    <div className="flex flex-col items-center md:items-start px-0 py-6 md:p-4 border-2 border-[#636363] border-dotted gap-3 lg:gap-4 font-doggy bg-gradient-to-bl from-[#ACE1AF] via-[#99D49F] to-[#82C88F]">
      <div className="flex items-center gap-2 mb-2 px-2 md:px-0">
        <h1 className="hidden md:inline md:text-2xl lg:text-4xl">Dogbook</h1>
        <img className="w-[1em] md:w-[1.5em] h-[1em] md:h-[1.5em]" src={pawprint} alt="" />
      </div>
      <Link className="w-full" to="/sign-up">
        <button className="flex w-full items-center justify-center md:justify-start gap-2 text-left text-md md:text-lg lg:text-xl px-4 py-2 rounded bg-white/30 hover:bg-white/50 border border-white/60 font-semibold">
          <span className="hidden md:inline">Sign Up</span>
          <span className="md:hidden text-lg">+</span>
        </button>
      </Link>
      <Link className="w-full" to="/">
        <button className="flex w-full items-center justify-center md:justify-start gap-2 text-left text-md md:text-lg lg:text-xl px-4 py-2 rounded hover:bg-[#6DB77A]">
          <span className="hidden md:inline">Sign In</span>
          <span className="md:hidden text-base">→</span>
        </button>
      </Link>
    </div>
  );
}

function GuestSidebar() {
  return (
    <div className="hidden lg:flex flex-col p-4 border-2 border-[#636363] border-dotted gap-3 font-doggy bg-gradient-to-bl from-[#ACE1AF] via-[#99D49F] to-[#82C88F]">
      <div className="flex items-center gap-2 mb-2">
        <img className="w-[1.5em] h-[1.5em]" src={wolfpack} alt="" />
        <h1 className="text-lg md:text-xl lg:text-2xl">Your Pack</h1>
      </div>
      <div className="flex flex-col items-center gap-3 mt-4 text-center px-2">
        <p className="text-sm lg:text-base text-[#1a4d22]">
          Sign up to start following people and build your pack!
        </p>
        <Link
          to="/sign-up"
          className="mt-1 px-4 py-2 rounded bg-white/40 border border-white/70 hover:bg-white/60 text-[#1a4d22] font-semibold text-sm lg:text-base transition-colors duration-150"
        >
          Click here to get started!
        </Link>
      </div>
    </div>
  );
}

export default function FakeDashboard() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["preview-posts"],
    queryFn: async () => {
      let res;
      try {
        res = await fetch("http://localhost:3000/dash/preview-posts", {
          method: "GET",
        });
      } catch {
        throw new Error("network");
      }
      if (res.status >= 500) throw new Error("server");
      if (!res.ok) throw new Error("general");
      return res.json();
    },
    retry: false,
  });

  const posts = data?.posts ?? [];

  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-cols-[4em_1fr] md:grid-cols-[12rem_1fr] lg:grid-cols-[16rem_1fr_14rem] min-h-screen">
      <GuestNavbar />
      <main className="p-2 sm:p-4 md:p-6 flex flex-col items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 via-gray-200 overflow-y-auto overflow-x-hidden">
        {isError && (
          <div className="flex flex-col items-center gap-3 mt-12 font-doggy">
            <p className="text-[#366B40]">Couldn't load the preview.</p>
            <button
              onClick={refetch}
              className="px-4 py-2 border border-[#366B40] rounded hover:bg-[#366B40] hover:text-white transition"
            >
              Try again
            </button>
          </div>
        )}

        {!isError && (
          <div className="flex flex-col gap-4 w-full lg:w-[40vw] xl:w-[50vw]">
            <div className="flex gap-2 items-center font-doggy">
              <h1 className="text-xl lg:text-2xl">BarkFeed Preview</h1>
              <img className="w-[1.5em] h-[1.5em]" src={pawprint} alt="" />
            </div>
            <div className="border-2 border-[#82C88F] rounded-md p-4 bg-gradient-to-br from-slate-50 to-slate-100 font-doggy text-center text-gray-500 shadow-md">
              <p>You're viewing a preview of Dogbook.</p>
              <p className="text-sm mt-1">
                <Link to="/sign-up" className="text-[#366B40] underline hover:text-[#1a4d22]">
                  Sign up
                </Link>{" "}
                to post, follow other dogs, and save your likes!
              </p>
            </div>
            {posts.length === 0 ? (
              <p className="text-center font-doggy text-gray-500 italic mt-8">
                No posts yet — be the first to join!
              </p>
            ) : (
              posts.map((post) => <FakePost key={post.id} post={post} />)
            )}
          </div>
        )}
      </main>
      <GuestSidebar />
    </div>
  );
}
