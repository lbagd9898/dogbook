import Button from "./Button";

export default function Form({ header, fields }) {
  return (
    <>
      <form action="POST" className="flex flex-col justify-center items-center">
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
    </>
  );
}
