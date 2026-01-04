import wolfpack from "../assets/icons/wolfpack.svg";
import like from "../assets/icons/like.svg";
import comment from "../assets/icons/comment.svg";

export default function Post() {
  return (
    <div className="group relative w-[40vw] pointer overflow-hidden cursor-pointer">
      {/* Shimmer Overlay */}
      <div className="absolute inset-0 w-[100%] bg-gradient-to-bl from-gray-100/10 via-gray-400/10 to-gray-800/20 top-0 left-0 -translate-x-full group-hover:translate-x-[0%] duration-700"></div>
      {/* Post Content */}
      <div className="border border-2 p-4 border-[#82C88F] rounded-md font-doggy flex flex-col gap-2 shadow-md bg-gradient-to-br from-slate-50 to-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <img className="w-[1.5em] h-[1.5em]" src={wolfpack} alt="" />
            <h1>Wolfy122</h1>
          </div>
          <em className="text-gray-600">Three hours ago</em>
        </div>
        <h1 className="text-lg">This is the title of the Post.</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img className="w-[1.5em] h-[1.5em]" src={like} alt="" />
            <p>1</p>
          </div>
          <div className="flex items-center gap-2">
            <img className="w-[1.5em] h-[1.5em]" src={comment} alt="" />
            <p>2</p>
          </div>
        </div>
      </div>
    </div>
  );
}
