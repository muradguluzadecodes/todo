import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",

  async function () {
    try {
      const res = await fetch("http://localhost:3000/todos");
      if (!res.ok) throw new Error("Pox ichine");
      const data = await res.json();
      // dispatch(updateTodo(data));
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

export const deleteItemFromAPI = createAsyncThunk(
  "todos/deleteItemFromAPI",
  async function deleteItemFromAPI(id) {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    });

    return id;
  }
);

export const postTodos = createAsyncThunk(
  "todos/postTodos",

  async function (data) {
    try {
      // dispatch(loadingChange());
      const res = await fetch("http://localhost:3000/todos", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Could not add the data");

      const item = await res.json();

      return item;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    updateTodo(state, action) {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(postTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(postTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(postTodos.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(deleteItemFromAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteItemFromAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((item) => item.id !== action.payload);
      });
  },
});

export const { deleteItem, addItem, updateTodo, loadingChange } =
  toDoSlice.actions;
export default toDoSlice.reducer;
