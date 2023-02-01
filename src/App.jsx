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

  const handleDeleteNote = (id) => {
    return () => {
      setNotes(notes.filter((note) => note.id !== id));
    };
  };

  const handleToggleNote = (id) => {
    return () => {
      setNotes((notes) =>
        notes.map((note) =>
          note.id === id ? { ...note, completed: !note.completed } : note
        )
      );
    };
  };

  return (
    <main className="grid bg-white min-h-screen">
      <div className="m-auto w-2/4">
        <div>
          <div>
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              className="border border-[#e300be] w-full h-full rounded p-2 mb-4"
              id="title"
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="description" className="sr-only">
              description
            </label>
            <textarea
              className="border border-[#e300be] w-full h-full rounded p-2 mb-2"
              id="description"
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <Button onClick={handleAddNote} type="submit">
            add
          </Button>
        </div>
        <h2 className="text-xl mt-10" id="list-heading">
          {notes.length} {notes.length > 1 ? "tasks" : "task"}
        </h2>
        <ul role="list" aria-labelledby="list-heading">
          {notes.map((note) => (
            <ListItem
              key={note.id}
              title={note.title}
              description={note.description}
              deleteNote={handleDeleteNote(note.id)}
              checked={note.completed}
              checkedNote={handleToggleNote(note.id)}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
