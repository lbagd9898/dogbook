import wolfpack from "../assets/icons/wolfpack.svg";
import { useState, useEffect } from "react";

export default function Comment({ key, comment }) {
  const [displayDate, setDisplayDate] = useState(comment.date);

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
    const date = updateDate(comment.date);
    setDisplayDate(date);
  }, []);

  return (
    <div className="p-4 w-full flex flex-col font-doggy border rounded shadow-md bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-sm md:text-base lg:text-lg flex justify-left items-center gap-2">
        <img src={wolfpack} className="h-[1em] w-[1em]" alt="" />
        <p>{comment.author}</p>
        <em className="text-gray-600">{displayDate}</em>
      </div>
      <div className="text-sm lg:text-base line-clamp-2">{comment.content}</div>
    </div>
  );
}
