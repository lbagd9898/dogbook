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
        className="flex flex-col justify-center gap-4 md:gap-6 items-center w-full"
      >
        <h1 className="text-2xl md:text-4xl lg:text-5xl text-center">{header}</h1>
        <div className="w-full grid grid-cols-[1fr_2fr] gap-x-3 gap-y-3 md:gap-y-4 items-center text-base md:text-lg lg:text-xl">
          {fields?.map((field) => (
            <>
              <label key={field.name + "-label"} htmlFor={field.name}>
                {field.label}
              </label>
              {field.type === "file" ? (
                <div key={field.name + "-input"} className="flex items-center gap-2 overflow-hidden min-w-0">
                  <label className="whitespace-nowrap border-2 text-base border-black rounded px-1 py-1 cursor-pointer">
                    Choose File
                    <input
                      className="hidden"
                      name={field.name}
                      type="file"
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="text-sm truncate">{fileName || "No file chosen"}</span>
                </div>
              ) : (
                <input
                  key={field.name + "-input"}
                  className="w-full border-2 border-black rounded"
                  name={field.name}
                  type={field.type}
                  value={inputVals[field.name]}
                  onChange={onChange}
                />
              )}
            </>
          ))}
        </div>
        <Button text={buttonText}></Button>
      </form>
    </>
  );
}
