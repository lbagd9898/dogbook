import Navbar from "../components/Navbar";
import Rightsidebar from "../components/Rightsidebar";
import EditProfile from "../components/EditProfile";
import wolfpack from "../assets/icons/wolfpack.svg";
import PostIcon from "../assets/icons/postIcon";
import Post from "../components/Post";
import grayPawprint from "../assets/icons/grayPawprint.svg";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function MyProfile() {
  console.log("profile mounted");

  //shows error alert if user hasn't enterred valid form data
  const [formError, setFormError] = useState("");
  const [showError, setShowError] = useState(false);
  const [showForm, setShowForm] = useState(false);

  function toggleFormError(error) {
    //if error already showing ignore
    if (showError) return;
    //set show error
    setFormError(error);
    setShowError(true);

    setTimeout(() => setShowError(false), 3000);
    setTimeout(() => setFormError(""), 3700);
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["myUserData"],
    queryFn: async () => {
      console.log("fetching...");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/my-profile`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        console.log("request failed");
        const body = await res.json();
        throw new Error(body.message);
      }
      const data = await res.json();
      console.log(data);
      return data;
    },
  });

  const user = data?.user;
  const posts = data?.posts;

  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-cols-[4em_1fr] md:grid-cols-[12rem_1fr] lg:grid-cols-[16rem_1fr_14rem] min-h-screen">
      <Navbar />
      <main className="p-2 sm:p-4 md:p-6 relative flex flex-col items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 via-gray-200 overflow-y-auto overflow-x-hidden">
        {isError ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center font-doggy">
            <div className="p-8 bg-white rounded border-2 border-[#82C88F] shadow-md flex flex-col items-center gap-3">
              <div className="text-5xl">🐾</div>
              <h2 className="text-2xl text-[#82C88F]">Something went wrong</h2>
              <p className="text-gray-500 text-lg">{error.message}</p>
              <button
                onClick={() => refetch()}
                className="mt-2 bg-white px-4 py-2 shadow-md rounded-lg border-2 border-[#82C88F] hover:bg-gray-200 hover:shadow-lg active:scale-95 transition-all duration-150 ease-out"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <>
            {showForm && (
              <EditProfile
                setShowForm={setShowForm}
                toggleFormError={toggleFormError}
              />
            )}
            <div
              className={`fixed z-10 top-4 font-doggy left-1/2 -translate-x-1/2 bg-red-100 border border-red-600 
              text-red-800 px-4 py-2 rounded-md shadow-md transition-opacity duration-700 ${showError ? "opacity-100" : "opacity-0"}`}
            >
              {formError}
            </div>
            <div className="flex flex-col gap-4 font-doggy w-full lg:w-[40vw] xl:w-[50vw]">
              <div className="p-3 flex flex-col gap-4 rounded border border-2 border-[#82C88F] bg-white">
                <div className="flex gap-3 text-md md:text-xl">
                  <div className="flex flex-1 p-1 md:p-2 lg:p-4 rounded shadow-md border border-2 border-[#82C88F] bg-gradient-to-br flex-col items-center from-white via-gray-200 to-gray-300">
                    <div>{user.followers}</div>
                    <div>Followers</div>
                  </div>
                  <div className="flex flex-1 p-1 md:p-2 lg:p-4 rounded shadow-md border border-2 border-[#82C88F] bg-gradient-to-br flex-col items-center from-white via-gray-200 to-gray-300">
                    <div>{user.following}</div>
                    <div>Following</div>
                  </div>
                  <div className="flex flex-1 p-1 md:p-2 lg:p-4 rounded shadow-md border border-2 border-[#82C88F] bg-gradient-to-br flex-col items-center from-white via-gray-200 to-gray-300">
                    <div>{posts.length}</div>
                    <div>Posts</div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-3 px-10">
                  <div className="flex flex-1 min-w-0 items-center justify-start gap-3 text-lg md:text-xl lg:text-2xl">
                    {user.picUrl ? (
                      <img
                        className="w-[4em] h-[4em] rounded-full object-cover flex-shrink-0"
                        src={user.picUrl}
                      />
                    ) : (
                      <img
                        className="w-[4em] h-[4em] rounded flex-shrink-0"
                        src={wolfpack}
                        alt=""
                      />
                    )}
                    <div className="flex flex-col min-w-0">
                      <p className="truncate">{user.username}</p>
                      {user.breed && (
                        <div className="flex items-center gap-2 text-base md:text-lg lg:text-xl text-gray-600 min-w-0">
                          <em className="block truncate min-w-0">{user.breed}</em>
                          <img
                            src={grayPawprint}
                            className="w-[1em] h-[1em] flex-shrink-0"
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 justify-end text-md md:text-lg lg:text-xl">
                    <button
                      className="bg-white px-4 py-2 shadow-md rounded-lg border-2 border-[#82C88F] pointer hover:bg-gray-200 hover:shadow-lg active:scale-95 transition-all duration-150 ease-out"
                      onClick={() => setShowForm(true)}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 px-3 text-xl text-gray-600">
                <PostIcon className="w-[1em] h-[1em]" />
                <p>Posts</p>
              </div>
              {posts.length === 0 ? (
                <div className="border-2 border-[#82C88F] rounded-md p-6 bg-white shadow-md font-doggy flex flex-col items-center gap-2 text-center text-gray-500">
                  <p>You haven't made any posts yet.</p>
                  <Link to="/dashboard" className="text-[#366B40] underline hover:text-[#82C88F] transition-colors duration-150">
                    Click here to make your first post!
                  </Link>
                </div>
              ) : (
                posts.map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    toggleFormError={toggleFormError}
                  />
                ))
              )}
            </div>
          </>
        )}
      </main>
      <Rightsidebar />
    </div>
  );
}
