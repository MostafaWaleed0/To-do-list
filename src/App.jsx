import "./output.css";
import { useState } from "react";
import ListItem from "./components/ListItem";
import Button from "./components/Button";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [values, setValues] = useState({
    id: "",
    title: "",
    description: "",
    completed: false,
  });
  const [notes, setNotes] = useLocalStorage("notes", []);

  const handleChange = (e) =>
    setValues((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));

  const handleAddNote = (e) => {
    e.preventDefault();
    if (values.title.trim() !== "") {
      setNotes([
        ...notes,
        {
          id: Math.random().toString(36).substring(2, 10),
          title: values.title,
          description: values.description,
          completed: values.completed,
        },
      ]);
      setValues({ id: "", title: "", description: "", completed: false });
    }
  };

  const handleDeleteNote = (id) =>
    setNotes(notes.filter((note) => note.id !== id));

  const handleToggleNote = (id) =>
    setNotes((notes) =>
      notes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );

  return (
    <main className="grid bg-white min-h-screen">
      <div className="m-auto w-2/4">
        <div>
          <input
            className="border border-[#e300be] w-full h-full rounded p-2 mb-4"
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
          <textarea
            className="border border-[#e300be] w-full h-full rounded p-2 mb-2"
            type="text"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
          <Button onClick={handleAddNote}>add</Button>
        </div>
        <ol role="list">
          {notes.map((note) => (
            <ListItem
              key={note.id}
              title={note.title}
              description={note.description}
              deleteNote={() => handleDeleteNote(note.id)}
              checked={note.completed}
              checkedNote={() => handleToggleNote(note.id)}
            />
          ))}
        </ol>
      </div>
    </main>
  );
}
