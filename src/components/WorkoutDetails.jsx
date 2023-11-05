import { useDispatch } from "react-redux";
import { TrashIcon } from "../assets/icons";
import { deleteItemFromAPI } from "../ToDoSlice";

// eslint-disable-next-line react/prop-types
function FunWorkoutDetails({ item }) {
  // eslint-disable-next-line react/prop-types
  const { title, description, id } = item;
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(deleteItemFromAPI(id));
  }

  return (
    <div className="workout-details">
      <div className="workout-content">
        <h4>{title}</h4>
        <p>
          <strong>Description: {description}</strong>
        </p>
      </div>

      <span onClick={handleClick}>
        <TrashIcon />
      </span>
    </div>
  );
}

export default FunWorkoutDetails;
