export default function Errors({ errors }) {
  return (
    <>
      <ul className="w-full flex flex-col items-center bg-red-200 border-2 border-red-500 mt-2 px-3 text-red-700 rounded">
        {errors.map((err, i) => (
          <li key={i}>{err}</li>
        ))}
      </ul>
    </>
  );
}
