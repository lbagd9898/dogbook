import Navbar from "../components/Navbar";
import pawprint from "../assets/icons/pawprint.svg";
import Rightsidebar from "../components/Rightsidebar";
import Post from "../components/Post";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-[16rem_1fr_14rem] min-h-screen">
      <Navbar />
      <main className="p-6 flex flex-col items-center h-screen overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center font-doggy">
            <h1 className="text-lg md:text-xl lg:text-2xl">Your BarkFeed</h1>
            <img className="w-[1.5em] h-[1.5em]" src={pawprint} alt="" />
          </div>
          <Post></Post>
        </div>
      </main>
      <Rightsidebar />
    </div>
  );
}
