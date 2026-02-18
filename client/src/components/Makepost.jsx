import wolfpack from "../assets/icons/wolfpack.svg";

export default function Makepost(props) {
  return (
    <div className="border border-2 p-4 border-[#82C88F] rounded-md font-doggy flex flex-col gap-2 shadow-md bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex justify-left items-center gap-2">
        <img src={wolfpack} className="h-[1em] w-[1em]" alt="" />
        <h1>Username</h1>
      </div>
      <form classname="w-full" action="post" onSubmit={props.onSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title your post..."
          value={props.postInput.title}
          onChange={props.handleChange}
          className="w-full border-grey border bg-white rounded p-1 shadow-md"
        />
        <textarea
          type="text"
          name="content"
          placeholder="What's on your mind?"
          value={props.postInput.content}
          onChange={props.handleChange}
          className="w-full border-grey border bg-white rounded p-1 shadow-md mt-2"
        />
        <div className="w-full flex justify-end items-center">
          <button
            className="bg-[#99D49F] hover:bg-[#6DB77A] mt-2 px-3 py-1 rounded shadow text-lg"
            action="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
