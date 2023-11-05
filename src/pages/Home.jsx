import { useDispatch, useSelector } from "react-redux";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useEffect } from "react";
// import { updateTodo } from "../ToDoSlice";
import { fetchTodos } from "../ToDoSlice";

export default function Home() {
  const list = useSelector((state) => state.todo.list);
  const { loading } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars

  useEffect(
    function () {
      dispatch(fetchTodos());
    },
    [dispatch]
  );

  return (
    <>
      {!list.length && <h1>Create your first todo list</h1>}
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
