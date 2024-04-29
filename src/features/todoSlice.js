import { createSlice, nanoid } from "@reduxjs/toolkit";

// setting the intial state //
const initialState = {
  todos: [],
};

// creating slice //
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
      console.log(action.payload.text);
    },
    // toggleComplete: (state, action) => {
    //   state.todos = state.todos.map((todo) =>
    //     todo.id === action.payload.id ? !action.payload.completed : state
    //   );
    // },
  },
});
export const { addTodo, removeTodo, updateTodo, toggleComplete } =
  todoSlice.actions;
export default todoSlice.reducer;
