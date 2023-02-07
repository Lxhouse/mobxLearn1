import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import TodoViewStore from "./TodoViewStore";
class TodoListStore {
  todos = [];
  constructor(todos) {
    makeAutoObservable(this);
    if (todos) {
      this.todos = todos;
    }
  }
  createTodo(title) {
    this.todos.push(new TodoViewStore(title));
  }
}
const TodoListStoreContext = createContext();
const TodoListStoreProvider = ({ store, children }) => {
  return (
    <TodoListStoreContext.Provider value={store}>
      {children}
    </TodoListStoreContext.Provider>
  );
};
const useTodoListStore = () => {
  return useContext(TodoListStoreContext);
};

export { TodoListStore, TodoListStoreProvider, useTodoListStore };
