// import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postTodos } from "../ToDoSlice";

export default function WorkoutForm() {
  // const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    if (!title || !description) return;

    const newListItem = {
      title,
      description,
    };

    dispatch(postTodos(newListItem));
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
