import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo, removeTodo } from "../features/todoSlice";
const Todo = () => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const todos = useSelector((state) => state.todos);
  console.log(todos);
  const [todoMsg, setTodoMsg] = useState("");
  console.log(todoMsg);
  const dispatch = useDispatch();
  useEffect(() => {
    if (todos.length > 0) {
      // Joining text values of all todos with a comma
      const allTodoText = todos.map((todo) => todo.text);
      setTodoMsg(allTodoText);
    } else {
      setTodoMsg("");
    }
  }, [todos]);
  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id} className="w-full">
          <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
              todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}>
            {/* <input
              type="checkbox"
              className="cursor-pointer"
              checked={todo.completed}
              onChange={dispatch(toggleComplete(todo.id))}
            /> */}
            <input
              type="text"
              className={`border outline-none w-full bg-transparent rounded-lg ${
                isTodoEditable ? "border-black/10 px-2" : "border-transparent"
              } ${todo.completed ? "line-through" : ""}`}
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}
              readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={() => {
                if (todo.completed) return;

                if (isTodoEditable) {
                  dispatch(updateTodo({ id: todo.id, text: todo.text }));
                  setIsTodoEditable(false);
                } else setIsTodoEditable((prev) => !prev);
              }}
              disabled={todo.completed}>
              {isTodoEditable ? "📁" : "✏️"}
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
