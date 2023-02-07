// TodoHeader.js
import { useState } from "react";
import { useTodoListStore } from "../../stores/Todos/TodoListStore";
function TodoHeader({ createTodo }) {
  const [title, setTitle] = useState("");
  const newTodoListStore = useTodoListStore();
  return (
    <header className="header">
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            newTodoListStore.createTodo(title);
            setTitle("");
          }
        }}
      />
    </header>
  );
}

export default TodoHeader;
