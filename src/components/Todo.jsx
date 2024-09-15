import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo, removeTodo } from "../features/todoSlice";

const Todo = () => {
  const todos = useSelector((state) => state.todo.todos); // Ensure you access state.todo.todos
  const [editableTodoId, setEditableTodoId] = useState(null); // Track which todo is editable
  const [todoText, setTodoText] = useState(""); // Track the text for the current todo being edited
  const dispatch = useDispatch();

  const handleEdit = (todo) => {
    setEditableTodoId(todo.id); // Set the current todo as editable
    setTodoText(todo.text); // Set the current text in the input field
  };

  const handleSave = (id) => {
    dispatch(updateTodo({ id, text: todoText })); // Dispatch the updateTodo action
    setEditableTodoId(null); // Reset editable state
  };

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id} className="w-full">
          <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
              todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}>
            <input
              type="text"
              className={`border outline-none w-full bg-transparent rounded-lg ${
                editableTodoId === todo.id ? "border-black/10 px-2" : "border-transparent"
              } ${todo.completed ? "line-through" : ""}`}
              value={editableTodoId === todo.id ? todoText : todo.text} // Display text based on edit state
              onChange={(e) => setTodoText(e.target.value)} // Update state when editing
              readOnly={editableTodoId !== todo.id} // Make input readonly if not editing
            />

            {/* Edit, Save Button */}
            <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={() => {
                if (editableTodoId === todo.id) {
                  handleSave(todo.id); // Save the edited todo
                } else {
                  handleEdit(todo); // Set todo to be editable
                }
              }}
              disabled={todo.completed}>
              {editableTodoId === todo.id ? "📁" : "✏️"}
            </button>

            {/* Delete Todo Button */}
            <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={() => dispatch(removeTodo(todo.id))}>
              ❌
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Todo;
