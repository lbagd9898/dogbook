export default function Button({ text, theme = "light", onClick, icon }) {
  const themeClasses = {
    light: "bg-[#ACE1AF] hover:bg-[#73AB7D] border border-gray",
    dark: "bg-[#F2F0EF] border-2 border-[#ACE1AF] hover:bg-[#D3D3D3]",
  };

  return (
    <button
      className={`px-5 py-1 rounded cursor-pointer flex items-center justify-center gap-2 ${themeClasses[theme]}`}
    >
      {icon && <img src={icon} className="w-[1em] h-[1em]" />} <div>{text}</div>
    </button>
  );
}
