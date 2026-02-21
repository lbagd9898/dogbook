import Navbar from "../components/Navbar";
import Rightsidebar from "../components/Rightsidebar";
import wolfpack from "../assets/icons/wolfpack.svg";

function UserProfile() {
  return (
    <div className="grid grid-cols-[4em_1fr] md:grid-cols-[12rem_1fr] lg:grid-cols-[16rem_1fr_14rem] min-h-screen">
      <Navbar />
      <main className="p-6 flex flex-col items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300 via-gray-200 overflow-y-auto">
        <div className="flex flex-col gap-4 font-doggy lg:w-[40vw] xl:w-[50vw]">
          <div className="flex p-3 rounded border border-2 border-[#82C88F] gap-2 items-center bg-white">
            <h1 className="text-lg">Username</h1>
          </div>
          <div className="p-3 flex flex-col gap-4 rounded border border-2 border-[#82C88F] bg-white">
            <div className="flex gap-3">
              <div className="flex flex-1 p-4 text-lg rounded shadow-md border border-2 border-[#82C88F] bg-gradient-to-br flex-col items-center from-white via-gray-200 to-gray-300">
                <div>0</div>
                <div>Followers</div>
              </div>
              <div className="flex flex-1 p-4 text-lg rounded shadow-md border border-2 border-[#82C88F] bg-gradient-to-br flex-col items-center from-white via-gray-200 to-gray-300">
                <div>0</div>
                <div>Following</div>
              </div>
              <div className="flex flex-1 p-4 text-lg rounded shadow-md border border-2 border-[#82C88F] bg-gradient-to-br flex-col items-center from-white via-gray-200 to-gray-300">
                <div>17</div>
                <div>Posts</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-1 items-center gap-3">
                <img className="w-[2em] h-[2em]" src={wolfpack} alt="" />
                <div className="flex flex-col">
                  <p className="text-xl">Username</p>
                  <p className="text-gray-500">Dogbreed</p>
                </div>
              </div>
              <div className="flex-1">
                <p>This is a paragraph about the dog and everything.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Rightsidebar />
    </div>
  );
}

export default UserProfile;
