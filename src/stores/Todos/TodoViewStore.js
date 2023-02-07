// TodoViewStore.js
class TodoViewStore {
  id = Math.random();
  title = "";
  completed = false;
  constructor(title) {
    this.title = title;
  }
}
export default TodoViewStore;
