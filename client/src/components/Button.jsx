export default function Button({ text, onClick }) {
  return (
    <button className="bg-[#ACE1AF] px-2 py-1 rounded cursor-pointer hover:bg-[#73AB7D]">
      {text}
    </button>
  );
}
