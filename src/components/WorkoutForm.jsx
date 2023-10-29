// import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, loadingChange } from "../ToDoSlice";

export default function WorkoutForm() {
  const { loading } = useSelector((state) => state.todo);
  console.log(loading);

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleClick(e) {
    e.preventDefault();

    if (!title || !description) return;

    const newListItem = {
      title,
      description,
    };

    async function postJSON(data) {
      try {
        dispatch(loadingChange());
        const res = await fetch("http://localhost:3000/todos", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Could not add the data");

        const item = await res.json();

        dispatch(addItem(item));
        console.log("Success:", item);
        dispatch(loadingChange());
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    postJSON(newListItem);
    setTitle("");
    setDescription("");
  }

  return (
    <form className="create">
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <label>Descprition:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleClick}>Add Workout</button>
    </form>
  );
}

// export async function action({ request }) {
//   console.log(request);
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
// }
