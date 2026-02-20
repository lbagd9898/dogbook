import Navbar from "../components/Navbar";
import pawprint from "../assets/icons/pawprint.svg";
import Rightsidebar from "../components/Rightsidebar";
import Post from "../components/Post";
import Makepost from "../components/Makepost";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const [postInput, setPostInput] = useState({ title: "", content: "" });

  const [formError, setFormError] = useState("");

  function toggleFormError(error) {
    setFormError(error);
    setTimeout(() => setFormError(""), 3000);
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setPostInput((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    //send form data to the server
    console.log("sending post data to server");
    try {
      const res = await fetch("http://localhost:3000/dash/new-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postInput),
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setPosts((prev) => [data.newPost, ...prev]);

      setPostInput({ title: "", content: "" });
    } catch (e) {
      console.log(e);
    }
  }

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
        console.log("post data", data);
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
      {formError && (
        <div
          className={`fixed top-4 font-doggy left-1/2 -translate-x-1/2 bg-red-100 border border-red-600 
        text-red-800 px-4 py-2 
        rounded-md shadow-md 
        transition-opacity duration-700 ${formError ? "opacity-100" : "opacity-0"}`}
        >
          {formError}
        </div>
      )}
      <Navbar />
      <main className="p-6 flex flex-col items-center h-screen overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center font-doggy">
            <h1 className="text-lg md:text-xl lg:text-2xl">Your BarkFeed</h1>
            <img className="w-[1.5em] h-[1.5em]" src={pawprint} alt="" />
          </div>
          <Makepost
            postInput={postInput}
            handleChange={handleChange}
            onSubmit={onSubmit}
          ></Makepost>
          {posts.map((post) => (
            <Post key={post.id} post={post} toggleFormError={toggleFormError} />
          ))}
        </div>
      </main>
      <Rightsidebar />
    </div>
  );
}
