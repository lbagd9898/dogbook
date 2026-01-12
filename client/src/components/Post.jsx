import wolfpack from "../assets/icons/wolfpack.svg";
import like from "../assets/icons/like.svg";
import comment from "../assets/icons/comment.svg";

export default function Post(props) {
  return (
    <div className="group relative w-[40vw] pointer overflow-hidden cursor-pointer">
      {/* Shimmer Overlay */}
      <div className="absolute inset-0 w-[100%] bg-gradient-to-bl from-gray-100/10 via-gray-400/10 to-gray-800/20 top-0 left-0 -translate-x-full group-hover:translate-x-[0%] duration-700"></div>
      {/* Post Content */}
      <div className="border border-2 p-4 border-[#82C88F] rounded-md font-doggy flex flex-col gap-2 shadow-md bg-gradient-to-br from-slate-50 to-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <img className="w-[1.5em] h-[1.5em]" src={wolfpack} alt="" />
            <h1>{props.post.author}</h1>
          </div>
          <em className="text-gray-600">{props.post.date}</em>
        </div>
        <h1 className="text-lg">{props.post.title}</h1>
        <p>{props.post.content}</p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img className="w-[1.5em] h-[1.5em]" src={like} alt="" />
            <p>{props.post.likes}</p>
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
