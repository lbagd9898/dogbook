import wolfpack from "../assets/icons/wolfpack.svg";
import { LikeIcon } from "../assets/icons/likeIcon";
import comment from "../assets/icons/comment.svg";
import { useState, useEffect, useRef } from "react";
import Comment from "./Comment";

export default function Post(props) {
  const [displayDate, setDisplayDate] = useState(props.post.date);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(props.post.likes || 0);
  const [visibleCommentCount, setVisibleCommentCount] = useState(2);
  const [visibleComments, setVisibleComments] = useState([]);

  const hasMounted = useRef(false);

  const showCommentsButton =
    props.post.comments && visibleCommentCount < props.post.comments.length;

  function toggleLike() {
    setLiked(!liked);
    setLikeCount((prev) => prev + (liked ? -1 : 1));
    hasMounted.current = true;
  }

  //set visible comments
  useEffect(() => {
    setVisibleComments(props.post.comments?.slice(-visibleCommentCount) || []);
  }, [visibleCommentCount]);

  useEffect(() => {
    if (!hasMounted.current) {
      console.log("hasnt mounted");
      return;
    }

    const updateLikes = async () => {
      try {
        console.log("update likes");
        const res = await fetch("http://localhost:3000/dash/update-likes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ liked, postId: props.post.id }),
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    };

    updateLikes();
  }, [likeCount]);

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
    <div className="lg:w-[40vw] xl:w-[50vw]">
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
          <p className="text-base md:text-lg lg:text-xl">
            {props.post.content}
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 z-10">
              <button
                className="hover:bg-pink-400 rounded-md p-1"
                onClick={toggleLike}
              >
                <LikeIcon
                  active={liked}
                  className="w-[1.5em] h-[1.5em]"
                ></LikeIcon>
                {/* <img className="w-[1.5em] h-[1.5em]" src={like} alt="" /> */}
              </button>
              <p>{likeCount}</p>
            </div>
            <div className="flex items-center gap-1 z-10">
              <button className="hover:bg-blue-400 rounded-md p-1">
                <img className="w-[1.5em] h-[1.5em]" src={comment} alt="" />
              </button>
              <p>2</p>
            </div>
          </div>
        </div>
      </div>
      {showCommentsButton && (
        <div className="px-4 py-1 shadow-md bg-gradient-to-br from-slate-50 to-slate-100 font-doggy text-gray-500 border-2 border-transparent hover:border-solid hover:border-gray-300 transition-all duration-500">
          <button
            onClick={() => setVisibleCommentCount(visibleCommentCount + 2)}
            className="w-full text-left"
          >
            View More Comments
          </button>
        </div>
      )}

      {visibleComments?.map((comment) => (
        <Comment key={comment.id} comment={comment}></Comment>
      ))}
      <div className="px-4 py-2 shadow-md bg-gradient-to-br from-slate-50 to-slate-100 font-doggy">
        <form className="flex gap-2 items-center" action="POST">
          <textarea
            className="resize-none overflow-y-auto min-h-[2.5rem] max-h-[7.5rem] flex-1 border-grey border bg-white rounded p-1 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            rows={1}
            placeholder="Add a comment..."
            type="text"
          />
          <button
            type="submit"
            className="bg-[#99D49F] hover:bg-[#6DB77A] py-1 px-2 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
