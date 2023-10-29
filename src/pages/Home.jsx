import { useDispatch, useSelector } from "react-redux";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useEffect } from "react";
import { updateTodo } from "../ToDoSlice";

export default function Home() {
  const list = useSelector((state) => state.todo.list);
  const { loading } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  console.log("Rendered component");

  // eslint-disable-next-line no-unused-vars

  useEffect(
    function () {
      async function datas() {
        const res = await fetch("http://localhost:3000/todos");
        const data = await res.json();
        dispatch(updateTodo(data));
      }

      datas();
    },
    [dispatch]
  );

  return (
    <>
      {!loading ? (
        <div className="home">
          <div className="workouts">
            {list.map((item) => (
              <WorkoutDetails key={item.id} item={item} />
            ))}
          </div>
          <WorkoutForm />
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}
