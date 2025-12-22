import Header from "../components/Header";
import Form from "../components/Form";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import Errors from "../components/Errors";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  //determines if user has started typing yet or not
  const [touched, setTouched] = useState(false);

  //list of errors for form validation
  const [errors, setErrors] = useState([]);

  const [inputVals, setInputVals] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  //generate navigate
  const navigate = useNavigate();

  //static variables
  //Sign in form variables
  const fields = [
    { name: "username", type: "text", label: "Username:" },
    { name: "email", type: "email", label: "Email: " },
    { name: "password", type: "password", label: "Password: " },
    { name: "confirmPassword", type: "password", label: "Confirm Password: " },
  ];

  const buttonText = "Sign Up";

  const header = "Enter your Info Below";

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

  //populates errors array as the user types
  //validates form inputs before sending to server
  function validate(values) {
    const errors = [];
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    if (!values.username) {
      errors.push("Username required.");
    } else if (values.username.length < 4 || values.username.length > 15) {
      errors.push("Username must be between 5 and 15 characters.");
    }
    if (!values.password) {
      errors.push("Password required.");
    } else if (values.password.length < 4 || values.password.length > 15) {
      errors.push("Password must be between 4 and 15 characters");
    } else if (!passwordRegex.test(values.password)) {
      errors.push("Password must contain at least one letter and one number.");
    }
    if (!values.email) {
      errors.push("Email required.");
    } else if (!values.email.includes("@")) {
      errors.push("Valid email required.");
    }
    if (values.password != values.confirmPassword) {
      errors.push("The two passwords must match.");
    }
    return errors;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    if (errors.length === 0 && touched === true) {
      try {
        const res = await fetch("http://localhost:3000/auth/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputVals),
        });
        const data = await res.json();
        if (res.ok) {
          console.log("successful", data);
          navigate("/", {
            state: { showBanner: true },
          });
        } else {
          console.log(data);
          if (data.message) {
            setErrors([data.message]);
          }
          if (data.errors) {
            const messages = data.errors.map((err) => err.msg);
            setErrors([messages]);
          }
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      return;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow p-2 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-600 flex flex-col font-doggy pt-[5%] gap-2 items-center m-0">
        <div>
          <div className="border-2 border-[#ACE1AF] rounded flex flex-col items-center p-4 md:p-6 lg:p-8 shadow-lg bg-white gap-2">
            <Form
              fields={fields}
              header={header}
              inputVals={inputVals}
              onChange={handleChange}
              buttonText={buttonText}
              onSubmit={onSubmit}
            ></Form>
          </div>
          {errors?.length > 0 && <Errors errors={errors} />}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
