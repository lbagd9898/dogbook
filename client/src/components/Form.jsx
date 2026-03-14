import { useState } from "react";
import Button from "./Button";

export default function Form({
  header,
  fields,
  inputVals,
  onChange,
  buttonText,
  onSubmit,
}) {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    setFileName(e.target.files[0]?.name);
    onChange(e);
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        action="POST"
        className="flex flex-col justify-center gap-4 md:gap-6 items-center"
      >
        <h1 className="text-2xl md:text-4xl lg:text-5xl">{header}</h1>
        {fields?.map((field) => (
          <div className="flex gap-2 justify-between items-center p-2 w-full text-base md:text-lg lg:text-xl">
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === "file" ? (
              <div className="flex items-center gap-2 overflow-hidden min-w-0">
                <label className="whitespace-nowrap border-2 text-base border-black rounded px-1 py-1 cursor-pointer">
                  Choose File
                  <input
                    className="hidden"
                    name={field.name}
                    type="file"
                    onChange={handleFileChange}
                  />
                </label>
                <span className="text-sm truncate max-w-xs">
                  {fileName || "No file chosen"}
                </span>
              </div>
            ) : (
              <input
                className="border-2 border-black rounded"
                name={field.name}
                type={field.type}
                value={inputVals[field.name]}
                onChange={onChange}
              />
            )}
          </div>
        ))}
        <Button text={buttonText}></Button>
      </form>
    </>
  );
}
