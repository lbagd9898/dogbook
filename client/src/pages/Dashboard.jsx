import Navbar from "../components/Navbar";
import Rightsidebar from "../components/Rightsidebar";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-[16rem_1fr_14rem] min-h-screen">
      <Navbar />
      <main className="bg-red-200">This is the main content</main>
      <Rightsidebar />
    </div>
  );
}
