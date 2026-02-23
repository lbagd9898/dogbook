import Navbar from "../components/Navbar";
import Rightsidebar from "../components/Rightsidebar";
import Post from "../components/Post";
import wolfpack from "../assets/icons/wolfpack.svg";
import PostIcon from "../assets/icons/postIcon";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  //shows error alert if user hasn't enterred valid form data
  const [formError, setFormError] = useState("");
  const [showError, setShowError] = useState(false);

  function toggleFormError(error) {
    setFormError(error);
    setShowError(true);

    setTimeout(() => setShowError(false), 3000);
    setTimeout(() => setFormError(""), 3700);
  }

  const { userId } = useParams();
  console.log(userId);

  useEffect(() => {
    const getUserData = async () => {
      console.log("fetch made");
      try {
        const res = await fetch(`http://localhost:3000/user/${userId}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        setUser(data.user);
        setPosts(data.posts);
        console.log(data.posts);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading === true) return <p>Loading...</p>;
  return (
    <div className="grid grid-cols-[4em_1fr] md:grid-cols-[12rem_1fr] lg:grid-cols-[16rem_1fr_14rem] min-h-screen">
      <Navbar />
      <main className="p-6 flex flex-col items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 via-gray-200 overflow-y-auto">
        <div className="flex flex-col gap-4 font-doggy lg:w-[40vw] xl:w-[50vw]">
          <div className="p-3 flex flex-col gap-4 rounded border border-2 border-[#82C88F] bg-white">
            <div className="flex gap-3">
              <div className="flex flex-1 p-4 text-lg rounded shadow-md border border-2 border-[#82C88F] bg-gradient-to-br flex-col items-center from-white via-gray-200 to-gray-300">
                <div>{user.followers}</div>
                <div>Followers</div>
              </div>
              <div className="flex flex-1 p-4 text-lg rounded shadow-md border border-2 border-[#82C88F] bg-gradient-to-br flex-col items-center from-white via-gray-200 to-gray-300">
                <div>{user.following}</div>
                <div>Following</div>
              </div>
              <div className="flex flex-1 p-4 text-lg rounded shadow-md border border-2 border-[#82C88F] bg-gradient-to-br flex-col items-center from-white via-gray-200 to-gray-300">
                <div>{posts.length}</div>
                <div>Posts</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-10">
              <div className="flex flex-1 items-center justify-start gap-3">
                <img className="w-[5em] h-[5em]" src={wolfpack} alt="" />
                <div className="flex flex-col">
                  <p className="text-2xl">{user.username}</p>
                </div>
              </div>
              <div className="flex-1 flex justify-end">
                <button
                  className="bg-[#82C88F] px-4 py-2 shadow-md text-lg rounded-lg border-2 border-black hover:bg-[#6fb97c]
                   hover:shadow-lg active:scale-95 transition-all duration-150 ease-out"
                >
                  Follow
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 px-3 text-xl text-gray-600">
            <PostIcon className="w-[1em] h-[1em]"></PostIcon>
            <p>Posts</p>
          </div>
          {posts.map((post) => (
            <Post key={post.id} post={post} toggleFormError={toggleFormError} />
          ))}
        </div>
      </main>
      <Rightsidebar />
    </div>
  );
}

export default UserProfile;
