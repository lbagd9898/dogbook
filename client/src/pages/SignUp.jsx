import Header from "../components/Header";
import Form from "../components/Form";
import Footer from "../components/Footer";
import { useState } from "react";
import Errors from '../components/Errors'

export default function SignUp() {
  //Sign in form variables
  const fields = [
    { name: "username", type: "text", label: "Username:" },
    { name: "email", type: "email", label: "Email: " },
    { name: "password", type: "password", label: "Password: " },
    { name: "confirmPassword", type: "password", label: "Confirm Password: " },
  ];

  const buttonText = "Sign Up";

  const [inputVals, setInputVals] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputVals((prev) => ({ ...prev, [name]: value }));
    console.log(inputVals);
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log('submitted')
    try {
      const res = await fetch('http://localhost:3000/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(inputVals) 
        });

        const result = await res.json()
        console.log(result)
      } catch(e) {
        console.log(e)
      }
    }

  const header = "Enter your Info Below";
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow p-2 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-600">
        <div className="flex flex-col font-doggy p-4 justify-center gap-2 m-10 items-center">
          <div className="border-2 border-[#ACE1AF] rounded flex flex-col items-center p-4 shadow-lg bg-white gap-2">
            <Form
              fields={fields}
              header={header}
              inputVals={inputVals}
              onChange={handleChange}
              buttonText={buttonText}
              onSubmit={onSubmit}
            ></Form>
          </div>
          <Errors></Errors>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
