import Navbar from "../components/Navbar";
import pawprint from "../assets/icons/pawprint.svg";
import Rightsidebar from "../components/Rightsidebar";
import Post from "../components/Post";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      console.log("loading posts");
      try {
        const res = await fetch("http://localhost:3000/dash/get-posts", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch posts.");
        }
        const data = await res.json();
        console.log(data);
        setPosts(data.posts);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading === true) return <p>Loading...</p>;
  //change this to error component after designing
  if (error != null) return <p>{error}</p>;
  return (
    <div className="grid grid-cols-[4em_1fr] md:grid-cols-[12rem_1fr] lg:grid-cols-[16rem_1fr_14rem] min-h-screen">
      <Navbar />
      <main className="p-6 flex flex-col items-center h-screen overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center font-doggy">
            <h1 className="text-lg md:text-xl lg:text-2xl">Your BarkFeed</h1>
            <img className="w-[1.5em] h-[1.5em]" src={pawprint} alt="" />
          </div>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </main>
      <Rightsidebar />
    </div>
  );
}
