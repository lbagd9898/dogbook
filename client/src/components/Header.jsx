import pawprint from "../assets/icons/pawprint.svg";

export default function Header() {
  return (
    <>
      <div className="flex flex-col p-5 border-2 border-[#636363] border-dotted border-silver justify-center items-center gap-3 font-doggy bg-gradient-to-bl from-[#ACE1AF] via-[#99D49F] to-[#82C88F]">
        <div className="flex gap-2">
          <h1 className="text-2xl">Doggy Facebook</h1>
          <img src={pawprint} alt="" />
        </div>
        <h2>A Facebook for dogs.</h2>
      </div>
    </>
  );
}
