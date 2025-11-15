import pawprint from "../assets/icons/pawprint.svg";

export default function Header() {
  return (
    <>
      <div className="flex flex-col p-5 border-2 border-black border-dotted border-silver bg-[#ACE1AF] justify-center items-center gap-3 font-doggy">
        <div className="flex gap-2">
          <h1 className="text-2xl">Doggy Facebook</h1>
          <img src={pawprint} alt="" />
        </div>
        <h2>A Facebook for dogs.</h2>
      </div>
    </>
  );
}
