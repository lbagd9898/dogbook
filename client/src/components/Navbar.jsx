import pawprint from "../assets/icons/pawprint.svg";
import home from "../assets/icons/home.svg";
import profile from "../assets/icons/profile.svg";
import logout from "../assets/icons/logout.svg";
import search from "../assets/icons/search.svg";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="flex flex-col items-center md:items-start px-0 py-6 md:p-4 border-2 border-[#636363] border-dotted border-silver gap-1 lg:gap-2 font-doggy bg-gradient-to-bl from-[#ACE1AF] via-[#99D49F] to-[#82C88F]">
      {showLogout && <Logout setShowLogout={setShowLogout} />}
      <div className="flex items-center gap-2 mb-2 px-2 md:px-0">
        <h1 className="hidden md:inline md:text-2xl lg:text-4xl">Dogbook</h1>
        <img
          className="w-[1em] md:w-[1.5em] h-[1em] md:h-[1.5em]"
          src={pawprint}
          alt=""
        />
      </div>
      <Link className="w-full" to="/dashboard">
        <button className="flex w-full items-center gap-2 text-left text-md md:text-lg lg:text-xl px-4 py-2 rounded hover:bg-[#6DB77A]">
          <img className="w-[1em] h-[1em]" src={home} alt="" />
          <p className="hidden md:inline">Home</p>
        </button>
      </Link>
      <Link className="w-full" to="/search">
        <button className="flex w-full items-center gap-2 text-left text-md md:text-lg lg:text-xl px-4 py-2 rounded hover:bg-[#6DB77A]">
          <img className="w-[1em] h-[1em]" src={search} alt="" />
          <p className="hidden md:inline">Search</p>
        </button>
      </Link>
      <Link className="w-full" to="/user/me">
        <button className="flex w-full items-center gap-2 text-left text-md md:text-lg lg:text-xl px-4 py-2 rounded hover:bg-[#6DB77A]">
          <img className="w-[1em] h-[1em]" src={profile} alt="" />
          <p className="hidden md:inline">Profile</p>
        </button>
      </Link>
      <button
        onClick={() => setShowLogout(true)}
        className="flex w-full items-center gap-2 text-left text-md md:text-lg lg:text-xl px-4 py-2 rounded hover:bg-[#6DB77A]"
      >
        <img className="w-[1em] h-[1em]" src={logout} alt="" />
        <p className="hidden md:inline">Logout</p>
      </button>
    </div>
  );
}
