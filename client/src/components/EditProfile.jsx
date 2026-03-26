import { useState } from "react";
import Form from "./Form";
export default function EditProfile({ setShowForm, toggleFormError }) {
  const [inputVals, setInputVals] = useState({});
  const [touched, setTouched] = useState(false);

  const header = "Edit Profile";
  const fields = [
    { name: "breed", type: "text", label: "Your breed:" },
    { name: "profilePic", type: "file", label: "Profile Picture: " },
  ];
  const buttonText = "Submit";

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    let imageUrl = null;
    // UPLOAD IMAGE TO CLOUDINARY
    if (inputVals.profilePic) {
      const imageFile = inputVals.profilePic;
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(imageFile.type)) {
        // toggleFormError("Image must be a JPEG, PNG, GIF, or WebP file.");
        return;
      }
      console.log("approved", imageFile);
      try {
        const formData = new FormData();
        formData.append("image", imageFile);
        console.log([...formData.entries()]);
        const uploadRes = await fetch("http://localhost:3000/dash/upload", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        if (!uploadRes.ok) {
          setShowForm(false);
          toggleFormError("Server error. Failed to update profile picture.");
          return;
        }
        const uploadData = await uploadRes.json();
        console.log(uploadData);
        imageUrl = uploadData.url;
        console.log(imageUrl);
      } catch (e) {
        console.log(e);
        setShowForm(false);
        toggleFormError("Server error. Failed to update profile picture.");
      }
    }
    //UPDATE USER DATA
    try {
      const res = await fetch(
        "http://localhost:3000/user/update-user?type=profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ breed: inputVals.breed, imageUrl }),
          credentials: "include",
        }
      );
      if (!res.ok) {
        setShowForm(false);
        toggleFormError("Server error. Failed to update user.");
        return;
      }
      window.location.reload();
    } catch (e) {
      console.log(e);
      setShowForm(false);
      toggleFormError("Server error. Failed to update user.");
    }
  };

  const onChange = (e) => {
    const { name, type, value, files } = e.target;
    setInputVals((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
    console.log(inputVals);
    if (!touched) {
      setTouched(true);
    }
  };
  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
      onClick={() => setShowForm(false)}
    >
      {/* Modal */}
      <div
        className="relative bg-white border-2 font-doggy border-[#82C88F] rounded p-8 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowForm(false)}
          className="h-[1em] w-[1em] absolute p-0 top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ✕
        </button>
        <Form
          header={header}
          fields={fields}
          inputVals={inputVals}
          onChange={onChange}
          buttonText={buttonText}
          onSubmit={onSubmit}
        ></Form>
      </div>
    </div>
  );
}
