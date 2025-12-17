import Button from "./Button";

export default function Form({
  header,
  fields,
  inputVals,
  onChange,
  buttonText,
  onSubmit,
}) {
  return (
    <>
      <form
        onSubmit={onSubmit}
        action="POST"
        className="flex flex-col justify-center gap-4 md:gap-6 items-center"
      >
        <h1 className="text-2xl md:text-4xl lg:text-5xl">{header}</h1>
        {fields.map((field) => (
          <div className="flex gap-2 justify-between p-2 w-full text-base md:text-lg lg:text-xl">
            <label for={field.name}>{field.label}</label>
            <input
              className="border-2 border-black rounded"
              name={field.name}
              type={field.type}
              value={inputVals[field.name]}
              onChange={onChange}
            />
          </div>
        ))}
        <Button text={buttonText}></Button>
      </form>
    </>
  );
}
