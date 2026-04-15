import wolfpack from "../assets/icons/wolfpack.svg";
import { LikeIcon } from "../assets/icons/likeIcon";
import comment from "../assets/icons/comment.svg";
import { useState, useEffect } from "react";
import Comment from "./Comment";

export default function FakePost({ post }) {
  const [displayDate, setDisplayDate] = useState(post.date);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [visibleCommentCount, setVisibleCommentCount] = useState(2);
  const [comments, setComments] = useState(post.comments || []);
  const [userComment, setUserComment] = useState("");

  const visibleComments = comments.slice(-visibleCommentCount);
  const showCommentsButton = visibleCommentCount < comments.length;

  function toggleLike() {
    setLiked((prev) => !prev);
    setLikeCount((prev) => prev + (liked ? -1 : 1));
  }

  function addComments() {
    setVisibleCommentCount((prev) => prev + 2);
  }

  function postComment(e) {
    e.preventDefault();
    if (!userComment.trim()) return;
    if (userComment.length > 1000) return;
    const fakeComment = {
      id: Date.now(),
      content: userComment,
      date: new Date().toISOString(),
      author: { username: "You (guest)" },
    };
    setComments((prev) => [...prev, fakeComment]);
    setVisibleCommentCount((prev) => prev + 1);
    setUserComment("");
  }

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
        if (count >= 1) return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
      return "just now";
    };
    setDisplayDate(updateDate(post.date));
  }, []);

  return (
    <div className="w-full lg:w-[40vw] xl:w-[50vw]">
      <div className="group relative w-full lg:w-[40vw] xl:w-[50vw] overflow-hidden">
        {/* Shimmer Overlay */}
        <div className="pointer-events-none absolute inset-0 w-[100%] bg-gradient-to-bl from-gray-100/10 via-gray-400/10 to-gray-800/20 top-0 left-0 -translate-x-full group-hover:translate-x-[0%] duration-700"></div>
        {/* Post Content */}
        <div className="border border-2 p-4 border-[#82C88F] rounded-md font-doggy flex flex-col gap-2 shadow-md bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="flex items-center gap-2">
            {post.author.picUrl ? (
              <img className="w-[1.5em] h-[1.5em] rounded-full" src={post.author.picUrl} alt="" />
            ) : (
              <img className="w-[1.5em] h-[1.5em] rounded" src={wolfpack} alt="" />
            )}
            <h1 className="text-base md:text-lg lg:text-xl">{post.author.username}</h1>
          </div>
          <em className="text-base md:text-lg lg:text-xl text-gray-600">{displayDate}</em>
          <h1 className="text-lg md:text-xl lg:text-2xl">{post.title}</h1>
          <p className="text-base md:text-lg lg:text-xl">{post.content}</p>
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="post image"
              className="rounded-md object-contain w-full max-h-[400px]"
            />
          )}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 z-10">
              <button
                className="hover:bg-pink-400 rounded-md p-1"
                onClick={toggleLike}
              >
                <LikeIcon active={liked} className="w-[1.5em] h-[1.5em]" />
              </button>
              <p>{likeCount}</p>
            </div>
            <div className="flex items-center gap-1 z-10">
              <button className="rounded-md p-1">
                <img className="w-[1.5em] h-[1.5em]" src={comment} alt="" />
              </button>
              <p>{comments.length}</p>
            </div>
          </div>
        </div>
      </div>

      {showCommentsButton && (
        <div className="px-4 py-1 shadow-md bg-gradient-to-br from-slate-50 to-slate-100 font-doggy text-gray-500 border-2 border-transparent hover:border-solid hover:border-gray-300 transition-all duration-500">
          <button onClick={addComments} className="w-full text-left">
            View More Comments
          </button>
        </div>
      )}

      {visibleComments.map((c) => (
        <Comment key={c.id} comment={c} />
      ))}

      <div className="px-4 py-2 shadow-md bg-gradient-to-br from-slate-50 to-slate-100 font-doggy">
        <form className="flex gap-2 items-center" onSubmit={postComment}>
          <textarea
            className="resize-none overflow-y-auto min-h-[2.5rem] max-h-[7.5rem] flex-1 border-grey border bg-white rounded p-1 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            rows={1}
            onChange={(e) => setUserComment(e.target.value)}
            value={userComment}
            placeholder="Add a comment (preview only — sign up to save!)"
          />
          <button
            type="submit"
            className="bg-[#99D49F] active:scale-95 hover:bg-[#6DB77A] py-1 px-2 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
