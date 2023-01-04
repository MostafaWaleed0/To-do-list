import Button from "./Button";

export default function ListItem({
  title,
  description,
  deleteNote,
  checked,
  checkedNote,
}) {
  const input = (
    <input
      type="checkbox"
      onChange={checkedNote}
      className="accent-[#e300be] h-6 w-6"
    />
  );

  return (
    <li className="border-2 border-[#e300be] text-black my-4 p-3 rounded">
      {description.trim() !== "" ? (
        <>
          <div>
            <div className="flex items-center mb-5">
              {input}
              <h3 className={`text-lg ml-5 ${checked && "line-through"}`}>
                {title}
              </h3>
            </div>
            <p className="whitespace-pre-line">{description}</p>
          </div>
          <div className="text-right">
            <Button onClick={deleteNote}>delete</Button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {input}
            <h3 className={`text-lg ml-5 ${checked && "line-through"}`}>
              {title}
            </h3>
          </div>
          <div className="text-right">
            <Button onClick={deleteNote}>delete</Button>
          </div>
        </div>
      )}
    </li>
  );
}
