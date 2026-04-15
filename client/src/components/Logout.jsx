import Form from "./Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function Logout({ setShowLogout }) {
  //initialize queryClient
  const queryClient = useQueryClient();
  const header = "Are you sure?";
  const buttonText = "Yes";

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/log-out`, {
        method: "POST",
        credentials: "include", // needed to send cookies
      });
      if (res.ok) {
        console.log("logout successful");
        queryClient.setQueryData(["user"], null);
        queryClient.clear();
        navigate("/");
      }
    } catch (err) {
      setError("Logout failed. Please try again.");
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
        {error && (
          <p className="mt-2 text-red-600 text-sm text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
