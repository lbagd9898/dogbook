import wolfpack from "../assets/icons/wolfpack.svg";

export default function Comment() {
  return (
    <div className="p-4 w-full flex flex-col font-doggy border rounded shadow-md bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-sm md:text-base lg:text-lg flex justify-left items-center gap-2">
        <img src={wolfpack} className="h-[1em] w-[1em]" alt="" />
        <p>User</p>
        <em className="text-gray-600">2 days ago</em>
      </div>
      <div className="text-sm lg:text-base line-clamp-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
    </div>
  );
}
