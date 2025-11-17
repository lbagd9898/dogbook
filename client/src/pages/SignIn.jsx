import Header from "../components/Header";
import Form from "../components/Form";
import Footer from "../components/Footer";

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
        <Form
          header={header}
          fields={fields}
          signInLink={signInLink}
          gitHubLink={gitHubLink}
        />
      </div>
      <Footer></Footer>
    </div>
  );
}
