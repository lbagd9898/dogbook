import { useState } from "react";
import Form from "./Form";
export default function EditProfile({ setShowForm }) {
  const [inputVals, setInputVals] = useState({ breed: "" });
  const [touched, setTouched] = useState(false);

  const header = "Edit Profile";
  const fields = [{ name: "breed", type: "text", label: "Your breed:" }];
  const buttonText = "Submit";

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputVals((prev) => ({ ...prev, [name]: value }));
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
