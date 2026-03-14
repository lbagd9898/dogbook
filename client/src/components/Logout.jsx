import Form from "./Form";
import { useNavigate } from "react-router-dom";

export default function Logout({ setShowLogout }) {
  const header = "Are you sure?";
  const buttonText = "Yes";

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/log-out", {
        method: "POST",
        credentials: "include", // needed to send cookies
      });
      if (res.ok) {
        console.log("logout successful");
        navigate("/");
      }
    } catch (err) {
      console.error("logout failed", err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
      onClick={() => setShowLogout(false)}
    >
      {/* Modal */}
      <div
        className="relative bg-white border-2 font-doggy border-[#82C88F] rounded p-8 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowLogout(false)}
          className="h-[1em] w-[1em] absolute p-0 top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ✕
        </button>
        <Form
          header={header}
          onSubmit={onSubmit}
          buttonText={buttonText}
        ></Form>
      </div>
    </div>
  );
}
