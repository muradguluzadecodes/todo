import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "./ToDoSlice";

const store = configureStore({
  reducer: {
    todo: toDoReducer,
  },
});

export default store;
