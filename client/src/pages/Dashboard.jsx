import Navbar from "../components/Navbar";
import pawprint from "../assets/icons/pawprint.svg";
import Rightsidebar from "../components/Rightsidebar";
import Post from "../components/Post";
import Makepost from "../components/Makepost";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const [postInput, setPostInput] = useState({ title: "", content: "" });

  //shows error alert if user hasn't enterred valid form data
  const [formError, setFormError] = useState("");
  const [showError, setShowError] = useState(false);

  function toggleFormError(error) {
    //if error already showing ignore
    if (showError) return;
    //set show error
    setFormError(error);
    setShowError(true);

    setTimeout(() => setShowError(false), 3000);
    setTimeout(() => setFormError(""), 3700);
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setPostInput((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    //validate form title and content
    if (postInput.title.trim() === "") {
      toggleFormError("Post must have a title.");
      return;
    }
    if (postInput.title.trim().length < 3) {
      toggleFormError("Title must be at least 3 characters long.");
      return;
    }
    if (postInput.title.trim().length > 30) {
      toggleFormError("Title cannot exceed 30 characters.");
      return;
    }
    // CONTENT VALIDATION
    if (postInput.content.trim() === "") {
      toggleFormError("Post must include content.");
      return;
    }
    const maxContentLength = 1500; // adjust if needed
    if (postInput.content.trim().length > maxContentLength) {
      toggleFormError(`Content cannot exceed ${maxContentLength} characters.`);
      return;
    }
    //send form data to the server if everything looks good
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

  if (loading === true) return <Loading></Loading>;
  //change this to error component after designing
  if (error != null) return <p>{error}</p>;
  return (
    <div className="grid grid-cols-[4em_1fr] md:grid-cols-[12rem_1fr] lg:grid-cols-[16rem_1fr_14rem] min-h-screen">
      <Navbar />
      <main className="relative p-6 flex flex-col items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 via-gray-200 overflow-y-auto">
        <div
          className={`absolute top-4 font-doggy left-1/2 -translate-x-1/2 bg-red-100 border border-red-600 
        text-red-800 px-4 py-2 
        rounded-md shadow-md 
        transition-opacity duration-700 ${showError ? "opacity-100" : "opacity-0"}`}
        >
          {formError}
        </div>
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
