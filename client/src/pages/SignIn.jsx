import Header from "../components/Header";
import Form from "../components/Form";
import Footer from "../components/Footer";
import Button from "../components/Button";
import githubIcon from "../assets/icons/github.svg";
import Errors from "../components/Errors";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SignIn() {
  //determines if user has started typing yet
  const [touched, setTouched] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  //input values
  const [inputVals, setInputVals] = useState({ email: "", password: "" });

  //list of errors in clientside form validation
  const [errors, setErrors] = useState([]);

  //button link navigation
  const navigate = useNavigate();
  const location = useLocation();

  //static variables
  //form variables
  const fields = [
    { name: "email", type: "email", label: "Email:" },
    { name: "password", type: "password", label: "Password: " },
  ];
  const buttonText = "Log In";
  const header = "Sign In Below";

  //re-populates errors array as user types
  useEffect(() => {
    if (touched) {
      const newErrors = validate(inputVals);
      setErrors(newErrors);
    }
  }, [inputVals]);

  //shows banner if user redirects from sign-up page
  useEffect(() => {
    if (location.state?.showBanner) {
      setShowBanner(true);

      // Hide banner after 5 seconds
      const fadeTimer = setTimeout(() => setFadeOut(true), 5000);

      const removeTimers = setTimeout(() => {
        setShowBanner(false);
        setFadeOut(false);
      }, 5500);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimers);
      };
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputVals((prev) => ({ ...prev, [name]: value }));
    if (!touched) {
      setTouched(true);
    }
  };

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
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-grow p-2 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-600 flex flex-col font-doggy pt-[5%] gap-2 items-center">
        <div>
          <div className="border-2 border-[#ACE1AF] rounded flex flex-col items-center p-4 shadow-lg bg-white gap-2">
            <Form
              header={header}
              fields={fields}
              inputVals={inputVals}
              onChange={handleChange}
              buttonText={buttonText}
            />
            <p>Don't have an account?</p>
            <Button
              text="Sign Up!"
              theme="dark"
              onClick={() => navigate("/sign-up")}
            ></Button>
            <em>Or</em>
            <Button
              text="Sign in with Github"
              theme="dark"
              icon={githubIcon}
            ></Button>
          </div>
          {errors?.length > 0 && <Errors errors={errors} />}
          {showBanner && (
            <div
              className={`bg-[#ACE1AF] border-2 border-[#66AA66] mt-2 rounded flex justify-center p-1 text-[#226622] transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
            >
              Enter your credentials.
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
