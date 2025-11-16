import Header from "../components/Header";
import Form from "../components/Form";

export default function SignIn() {
  const fields = [
    { name: "username", type: "text", label: "Username:" },
    { name: "password", type: "password", label: "Password: " },
  ];

  const header = "Sign In Below";

  return (
    <div className="h-screen flex flex-col w-screen">
      <Header />
      <div className="flex-grow pt-[20vh] bg-gradient-to-br from-gray-100 via-gray-300 to-gray-600">
        <Form header={header} fields={fields} />
      </div>
    </div>
  );
}
