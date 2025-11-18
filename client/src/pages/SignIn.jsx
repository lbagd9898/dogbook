import Header from "../components/Header";
import Form from "../components/Form";
import Footer from "../components/Footer";
import Button from "../components/Button";
import githubIcon from "../assets/icons/github.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  //button link navigation
  const navigate = useNavigate();

  //form variables
  const fields = [
    { name: "username", type: "text", label: "Username:" },
    { name: "password", type: "password", label: "Password: " },
  ];

  const buttonText = "Log In";

  const [inputVals, setInputVals] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputVals((prev) => ({ ...prev, [name]: value }));
    console.log(inputVals);
  };

  const header = "Sign In Below";

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-grow p-2 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-600">
        <div className="flex flex-col font-doggy p-4 justify-center gap-2 m-10 items-center">
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
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
