import wolfpack from "../assets/icons/wolfpack.svg";
import PhotoIcon from "../assets/icons/PhotoIcon";

export default function Makepost(props) {
  return (
    <div className="lg:w-[40vw] xl:w-[50vw] border border-2 p-4 border-[#82C88F] rounded-md font-doggy flex flex-col gap-2 shadow-md bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex justify-left items-center gap-2">
        {props.user.picUrl ? (
          <img className="h-[1.5em] w-[1.5em]" src={props.user.picUrl} />
        ) : (
          <img src={wolfpack} className="h-[1.5em] w-[1.5em]" alt="" />
        )}
        <h1 className="text-base md:text-lg lg:text-xl">
          {props.user.username}
        </h1>
      </div>
      <form
        className="w-full text-sm md:text-base lg:text-lg"
        action="post"
        onSubmit={props.onSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Title your post..."
          value={props.postInput.title}
          onChange={props.handleChange}
          className="w-full border-grey border bg-white rounded p-1 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <textarea
          type="text"
          name="content"
          placeholder="What's on your mind?"
          value={props.postInput.content}
          onChange={props.handleChange}
          className="w-full border-grey border bg-white rounded p-1 shadow-md mt-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <div className="w-full flex justify-between items-end">
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            className="hidden"
            onChange={props.handleImageChange}
          />
          <div className="flex items-center gap-2">
            <label htmlFor="image-upload" className="cursor-pointer">
              <PhotoIcon className="h-6 w-6 text-gray-400 hover:text-[#6DB77A] transition-colors duration-200" />
            </label>
            {props.imageFile && <div>{props.imageFile.name}</div>}
          </div>
          <button
            className="w-auto
                      bg-[#99D49F] hover:bg-[#6DB77A]
                      mt-2
                      px-4 py-2 sm:px-4 sm:py-2
                      rounded shadow
                      text-base sm:text-lg
                      transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-[#6DB77A]/50
                      active:scale-95"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
