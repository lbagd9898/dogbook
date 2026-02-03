import wolfpack from "../assets/icons/wolfpack.svg";

export default function Makepost() {
  return (
    <div className="border border-2 p-4 border-[#82C88F] rounded-md font-doggy flex flex-col gap-2 shadow-md bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex justify-left items-center gap-2">
        <img src={wolfpack} className="h-[1em] w-[1em]" alt="" />
        <h1>Username</h1>
      </div>
      <form action="">
        <div className="bg-white rounded p-2 shadow-md">xxx</div>
      </form>
    </div>
  );
}
