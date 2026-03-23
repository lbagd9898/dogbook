import Navbar from "../components/Navbar";
import pawprint from "../assets/icons/pawprint.svg";
import Rightsidebar from "../components/Rightsidebar";
import Post from "../components/Post";
import Makepost from "../components/Makepost";
import Loading from "../components/Loading";
import { useState, useEffect, useCallback } from "react";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  //user's username to update in the UI
  const [user, setUser] = useState(null);

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

  //save image file when user attaches one in form
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  async function onSubmit(e) {
    e.preventDefault();

    // form validation — unchanged
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
    if (postInput.content.trim() === "") {
      toggleFormError("Post must include content.");
      return;
    }
    if (postInput.content.trim().length > 1500) {
      toggleFormError(`Content cannot exceed 1500 characters.`);
      return;
    }

    let imageUrl = null;

    // STEP 1: image upload (if attached)
    if (imageFile) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(imageFile.type)) {
        toggleFormError("Image must be a JPEG, PNG, GIF, or WebP file.");
        return;
      }
      if (imageFile.size > 5 * 1024 * 1024) {
        toggleFormError("Image must be under 5MB.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("image", imageFile);
        const uploadRes = await fetch("http://localhost:3000/dash/upload", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        if (uploadRes.status === 401) {
          window.location.href = "/login";
          return;
        }
        if (!uploadRes.ok) {
          toggleFormError("Image upload failed. Please try again.");
          return; // block the post entirely
        }

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      } catch (err) {
        toggleFormError("Image upload failed. Check your connection.");
        return; // block the post entirely
      }
    }

    // STEP 2: submit the post
    try {
      const res = await fetch("http://localhost:3000/dash/new-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...postInput, imageUrl }),
        credentials: "include",
      });

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (res.status >= 500) {
        toggleFormError("Server error. Please try again in a moment.");
        return;
      }
      if (!res.ok) {
        toggleFormError("Failed to post. Please try again.");
        return;
      }

      const data = await res.json();
      setPosts((prev) => [data.newPost, ...prev]);
      setPostInput({ title: "", content: "" });
      setImageFile(null);
    } catch (err) {
      toggleFormError("No connection. Check your internet and try again.");
    }
  }

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/dash/get-posts", {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (res.status >= 500) {
        setError("server");
        return;
      }
      if (!res.ok) {
        setError("general");
        return;
      }

      const data = await res.json();
      setPosts(data.posts);
      setUser(data.user);
    } catch (err) {
      // network error - fetch itself threw
      setError("network");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  if (loading === true) return <Loading></Loading>;
  return (
    <div className="grid grid-cols-[4em_1fr] md:grid-cols-[12rem_1fr] lg:grid-cols-[16rem_1fr_14rem] min-h-screen">
      <Navbar />
      <main className="p-6 flex flex-col items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 via-gray-200 overflow-y-auto">
        {error === "server" && (
          <div className="flex flex-col items-center gap-3 mt-12 font-doggy">
            <p className="text-[#366B40]">Failed to load your BarkFeed.</p>
            <button
              onClick={loadPosts}
              className="px-4 py-2 border border-[#366B40] rounded hover:bg-[#366B40] hover:text-white transition"
            >
              Try again
            </button>
          </div>
        )}

        {error === "network" && (
          <div className="flex flex-col items-center gap-3 mt-12 font-doggy">
            <p className="text-[#366B40]">
              No connection. Check your internet and try again.
            </p>
            <button
              onClick={loadPosts}
              className="px-4 py-2 border border-[#366B40] rounded hover:bg-[#366B40] hover:text-white transition"
            >
              Retry
            </button>
          </div>
        )}

        {error === "general" && (
          <p className="mt-12 font-doggy text-[#366B40]">
            Something went wrong. Please refresh the page.
          </p>
        )}

        {!error && (
          <>
            <div
              className={`fixed z-10 top-4 font-doggy left-1/2 -translate-x-1/2 bg-red-100 border border-red-600 
        text-red-800 px-4 py-2 
        rounded-md shadow-md 
        transition-opacity duration-700 ${showError ? "opacity-100" : "opacity-0"}`}
            >
              {formError}
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center font-doggy">
                <h1 className="text-xl lg:text-2xl">Your BarkFeed</h1>
                <img className="w-[1.5em] h-[1.5em]" src={pawprint} alt="" />
              </div>
              <Makepost
                user={user}
                postInput={postInput}
                handleChange={handleChange}
                onSubmit={onSubmit}
                imageFile={imageFile}
                handleImageChange={handleImageChange}
              ></Makepost>
              {posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  toggleFormError={toggleFormError}
                />
              ))}
            </div>
          </>
        )}
      </main>
      <Rightsidebar />
    </div>
  );
}
