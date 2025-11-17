import Header from "../components/Header";
import Form from "../components/Form";
import Footer from "../components/Footer";
import Button from "../components/Button";
import githubIcon from "../assets/icons/github.svg";

export default function SignIn() {
  const fields = [
    { name: "username", type: "text", label: "Username:" },
    { name: "password", type: "password", label: "Password: " },
  ];

  const signInLink = true;

  const gitHubLink = true;

  const header = "Sign In Below";

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-grow p-2 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-600">
        <div className="flex flex-col font-doggy p-4 justify-center gap-2 margin-4 items-center">
          <div className="border-2 border-[#ACE1AF] rounded flex flex-col items-center p-4 shadow-lg bg-white gap-2">
            <Form
              header={header}
              fields={fields}
              signInLink={signInLink}
              gitHubLink={gitHubLink}
            />
            <p>Don't have an account?</p>
            <Button text="Sign Up!" theme="dark"></Button>
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
