import Header from "../components/Header";
import Form from "../components/Form";
import Footer from "../components/Footer";
import Errors from "../components/Errors";
import { useState, useEffect } from "react";

export default function GitHubSignIn() {
  const [touched, setTouched] = useState(false);

  //input values
  const [inputVals, setInputVals] = useState({ email: "", password: "" });

  //list of errors in clientside form validation
  const [errors, setErrors] = useState([]);

  //static variables
  //form variables
  const fields = [
    { name: "email", type: "email", label: "Email:" },
    { name: "password", type: "password", label: "Password: " },
  ];
  const buttonText = "Log In";
  const header = "Link Your Account";

  //re-populates errors array as user types
  useEffect(() => {
    if (touched) {
      const newErrors = validate(inputVals);
      setErrors(newErrors);
    }
  }, [inputVals]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputVals((prev) => ({ ...prev, [name]: value }));
    if (!touched) {
      setTouched(true);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  //re-populates error messages after the user types
  function validate(values) {
    const errors = [];
    if (!values.email) {
      errors.push("Email required.");
    } else if (!values.email.includes("@")) {
      errors.push("Valid email required.");
    }
    if (!values.password) {
      errors.push("Password required.");
    }
    return errors;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow p-2 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-600 flex flex-col font-doggy gap-2 items-center pt-[5vh] md:pt-[8vh]">
        <div>
          <div className="border-2 border-[#ACE1AF] rounded flex flex-col items-center p-4 md:p-6 lg:p-8 shadow-lg bg-white gap-4 md:gap-6 text-base md:text-lg lg:text-xl">
            <Form
              header={header}
              fields={fields}
              inputVals={inputVals}
              onChange={handleChange}
              buttonText={buttonText}
            />
          </div>
          {errors?.length > 0 && <Errors errors={errors} />}
        </div>
        <div className="bg-[#ACE1AF] border-2 border-[#66AA66] mt-2 rounded flex justify-center py-1 px-3 text-[#226622]">
          We couldn't find an account linked to your Github.
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
