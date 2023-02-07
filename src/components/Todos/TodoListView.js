import { observer } from "mobx-react-lite";
import TodoHeader from "./TodoHeader";
import TodoView from "./TodoView";
// TodoListView.js
function TodoListView({ TodoListStore }) {
  return (
    <div>
      <TodoHeader
        createTodo={(title) => TodoListStore.createTodo(title)}
      ></TodoHeader>
      <ul className="todo-list">
        {TodoListStore.todos.map((todo) => (
          <TodoView key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
export default observer(TodoListView);
