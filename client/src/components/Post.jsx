import wolfpack from "../assets/icons/wolfpack.svg";
import like from "../assets/icons/like.svg";
import comment from "../assets/icons/comment.svg";
import { useState, useEffect } from "react";

export default function Post(props) {
  const [displayDate, setDisplayDate] = useState(props.post.date);

  useEffect(() => {
    const updateDate = (date) => {
      const now = new Date();
      const inputDate = new Date(date);

      const seconds = Math.floor((now - inputDate) / 1000);

      if (seconds < 0) return "in the future";

      if (seconds < 30) return "just now";

      const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
      ];

      for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
          return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
        }
      }

      return "just now";
    };
    const date = updateDate(props.post.date);
    setDisplayDate(date);
  }, []);
  return (
    <div className="group relative lg:w-[40vw] xl:w-[50vw] pointer overflow-hidden cursor-pointer">
      {/* Shimmer Overlay */}
      <div className="absolute inset-0 w-[100%] bg-gradient-to-bl from-gray-100/10 via-gray-400/10 to-gray-800/20 top-0 left-0 -translate-x-full group-hover:translate-x-[0%] duration-700"></div>
      {/* Post Content */}
      <div className="border border-2 p-4 border-[#82C88F] rounded-md font-doggy flex flex-col gap-2 shadow-md bg-gradient-to-br from-slate-50 to-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <img className="w-[1.5em] h-[1.5em]" src={wolfpack} alt="" />
            <h1 className="text-base md:text-lg lg:text-xl">
              {props.post.author}
            </h1>
          </div>
          <em className="text-base md:text-lg lg:text-xl text-gray-600">
            {displayDate}
          </em>
        </div>
        <h1 className="text-lg md:text-xl lg:text-2xl">{props.post.title}</h1>
        <p className="text-base md:text-lg lg:text-xl">{props.post.content}</p>
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
