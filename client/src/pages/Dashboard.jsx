import Navbar from "../components/Navbar";
import pawprint from "../assets/icons/pawprint.svg";
import Rightsidebar from "../components/Rightsidebar";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-[16rem_1fr_14rem] min-h-screen">
      <Navbar />
      <main className="p-6">
        <div className="flex gap-2 items-center font-doggy">
          <h1 className="text-lg md:text-xl lg:text-2xl">Your BarkFeed</h1>
          <img className="w-[1.5em] h-[1.5em]" src={pawprint} alt="" />
        </div>
      </main>
      <Rightsidebar />
    </div>
  );
}
