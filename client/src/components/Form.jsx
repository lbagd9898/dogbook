import Button from "./Button";

export default function Form({ header, fields, signInLink, gitHubLink }) {
  return (
    <>
      <div className="flex flex-col font-doggy p-4 justify-center gap-2 margin-4 items-center">
        <form
          className="border-2 border-[#ACE1AF] rounded flex flex-col items-center p-4 shadow-lg bg-white"
          action="POST"
        >
          <h1 className="text-2xl">{header}</h1>
          {fields.map((field) => (
            <div className="flex gap-2 justify-between p-2">
              <label for={field.name}>{field.label}</label>
              <input
                className="border-2 border-black rounded"
                name={field.name}
                type={field.type}
              />
            </div>
          ))}
          <Button text="Log In"></Button>
        </form>
      </div>
    </>
  );
}
