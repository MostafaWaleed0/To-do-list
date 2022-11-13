export default function Button({ children, bg, ...props }) {
  return (
    <button
      type="button"
      className="uppercase border-2 p-3 rounded text-white bg-[#e300be] border-none"
      {...props}
    >
      {children}
    </button>
  );
}
