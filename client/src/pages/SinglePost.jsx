import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Rightsidebar from "../components/Rightsidebar";
import MainPost from "../components/MainPost";
import PostIcon from "../assets/icons/postIcon";

export default function SinglePost() {
  const { postId } = useParams();

  //shows error alert if user hasn't enterred valid form data
  const [formError, setFormError] = useState("");
  const [showError, setShowError] = useState(false);

  function toggleFormError(error) {
    //if error already showing ignore
    if (showError) return;
    //set show error
    setFormError(error);
    setShowError(true);
    console.log("error initiated");

    setTimeout(() => setShowError(false), 3000);
    setTimeout(() => setFormError(""), 3700);
  }

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
    <div className="grid grid-cols-[4em_1fr] md:grid-cols-[12rem_1fr] lg:grid-cols-[16rem_1fr_14rem] min-h-screen">
      <Navbar></Navbar>
      <main className="relative p-6 flex gap-3 flex-col items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 via-gray-200 overflow-y-auto">
        <div className="font-doggy lg:w-[40vw] xl:w-[50vw] flex items-center gap-1 px-3 text-xl text-gray-600">
          <PostIcon className="w-[1em] h-[1em]"></PostIcon>
          <div>{post.author.username}'s post</div>
        </div>
        <div
          className={`absolute top-4 font-doggy left-1/2 -translate-x-1/2 bg-red-100 border border-red-600 
        text-red-800 px-4 py-2 
        rounded-md shadow-md z-10
        transition-opacity duration-700 ${showError ? "opacity-100" : "opacity-0"}`}
        >
          {formError}
        </div>
        <MainPost post={post} toggleFormError={toggleFormError}></MainPost>
      </main>
      <Rightsidebar></Rightsidebar>
    </div>
  );
}
