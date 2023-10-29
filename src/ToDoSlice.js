import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loading: false,
};

const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    deleteItem(state, action) {
      // will receive itemId
      state.list = state.list.filter((item) => item.id !== action.payload);
    },

    addItem(state, action) {
      // will receive item

      state.list.push(action.payload);
    },

    updateTodo(state, action) {
      state.list = action.payload;
    },

    loadingChange(state) {
      state.loading = !state.loading;
    },
  },
});

export const { deleteItem, addItem, updateTodo, loadingChange } =
  toDoSlice.actions;
export default toDoSlice.reducer;
