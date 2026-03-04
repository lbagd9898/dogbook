import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import wolfpack from "../assets/icons/wolfpack.svg";
import { LikeIcon } from "../assets/icons/likeIcon";
import comment from "../assets/icons/comment.svg";
import { useState } from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import Post from "../components/Post";

export default function SinglePost() {
  function toggleLike() {
    console.log("toggled");
  }

  const [liked, setLiked] = useState(false);
  const { postId } = useParams();
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      console.log("fetching post data...");
      const res = await fetch(`http://localhost:3000/dash/get-post/${postId}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await res.json();
      console.log(data);
      return data.post;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <div className="border border-2 p-4 border-[#82C88F] rounded-md font-doggy flex flex-col gap-2 shadow-md bg-gradient-to-br from-slate-50 to-slate-100">
      <div>
        <Link to={`/user/${post.author.id}`}>
          <div className="flex items-center gap-2 cursor-pointer z-10">
            <img className="w-[1.5em] h-[1.5em]" src={wolfpack} alt="" />
            <h1 className="text-base md:text-lg lg:text-xl">
              {post.author.username}
            </h1>
          </div>
        </Link>
        <em className="text-base md:text-lg lg:text-xl text-gray-600">
          {post.date}
        </em>
      </div>
      <h1 className="text-lg md:text-xl lg:text-2xl">{post.title}</h1>
      <p className="text-base md:text-lg lg:text-xl">{post.content}</p>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1 z-10">
          <button
            className="hover:bg-pink-400 rounded-md p-1"
            onClick={toggleLike}
          >
            <LikeIcon active={liked} className="w-[1.5em] h-[1.5em]"></LikeIcon>
            {/* <img className="w-[1.5em] h-[1.5em]" src={like} alt="" /> */}
          </button>
          <p>{post.likes}</p>
        </div>
        <div className="flex items-center gap-1 z-10">
          <button className="rounded-md p-1">
            <img className="w-[1.5em] h-[1.5em]" src={comment} alt="" />
          </button>
          <p>{post.comments?.length || 0}</p>
        </div>
      </div>
    </div>
  );
}
