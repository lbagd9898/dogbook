export default function Button({ text, onClick }) {
  return (
    <button className="bg-[#ACE1AF] px-5 py-1 rounded cursor-pointer hover:bg-[#73AB7D] border border-gray">
      {text}
    </button>
  );
}
