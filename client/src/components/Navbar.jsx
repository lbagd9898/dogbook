import pawprint from "../assets/icons/pawprint.svg";
import home from "../assets/icons/home.svg";
import post from "../assets/icons/post.svg";
import profile from "../assets/icons/profile.svg";
import logout from "../assets/icons/logout.svg";

export default function Navbar() {
  return (
    <div className="flex flex-col p-4 border-2 border-[#636363] border-dotted border-silver gap-1 lg:gap-2 font-doggy bg-gradient-to-bl from-[#ACE1AF] via-[#99D49F] to-[#82C88F]">
      <div className="flex items-center gap-2 mb-2">
        <h1 className="text-xl md:text-2xl lg:text-4xl">Dogbook</h1>
        <img className="w-[1.5em] h-[1.5em]" src={pawprint} alt="" />
      </div>
      <button className="flex items-center gap-2 text-left text-md md:text-lg lg:text-xl px-4 py-2 rounded hover:bg-[#6DB77A]">
        <img className="w-[1em] h-[1em]" src={home} alt="" />
        Home
      </button>
      <button className="flex items-center gap-2 text-left text-md md:text-lg lg:text-xl px-4 py-2 rounded hover:bg-[#6DB77A]">
        <img className="w-[1em] h-[1em]" src={post} alt="" />
        Post
      </button>
      <button className="flex items-center gap-2 text-left text-md md:text-lg lg:text-xl px-4 py-2 rounded hover:bg-[#6DB77A]">
        <img className="w-[1em] h-[1em]" src={profile} alt="" />
        Profile
      </button>
      <button className="flex items-center gap-2 text-left text-md md:text-lg lg:text-xl px-4 py-2 rounded hover:bg-[#6DB77A]">
        <img className="w-[1em] h-[1em]" src={logout} alt="" />
        Logout
      </button>
    </div>
  );
}
