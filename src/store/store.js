import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "../features/todoSlice";
export const store = configureStore({
  reducer: TodoSlice,
});
