import { createContext, useContext } from "react";
import { TodoListStore } from "./Todos/TodoListStore";

class RootStore {
  constructor() {
    this.todoListStore = new TodoListStore();
  }
}

const RootStoreContext = createContext();

const RootStoreProvider = ({ store, children }) => {
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};

const useRootStore = () => {
  return useContext(RootStoreContext);
};

export { RootStore, RootStoreProvider, useRootStore };
