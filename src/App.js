import TrackPlayback from "./components/trackPlayback";
import TrackPlayBackStore from "./stores/trackPlayBack/trackPlayBackStore";
function App() {
  const trackPlayBackStore = new TrackPlayBackStore();
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <TrackPlayback trackPlayBackStore={trackPlayBackStore}></TrackPlayback>
    </div>
  );
}

export default App;

// // 导入 Counter 组件
// // 导入管理 Counter 组件的 Store
// import TodoListView from "./components/Todos/TodoListView";s
// import {
//   TodoListStore,
//   TodoListStoreProvider,
// } from "./stores/Todos/TodoListStore";
// import TodoViewStore from "./stores/Todos/TodoViewStore";

// const todoListStore = new TodoListStore([
//   new TodoViewStore("测试 mobx1"),
//   new TodoViewStore("测试 mobx2"),
//   new TodoViewStore("测试 mobx3"),
//   new TodoViewStore("测试 mobx4"),
// ]);
// function App() {
//   // 调用 Counter 组件并传入管理其状态的 Store
//   return (
//     <TodoListStoreProvider store={todoListStore}>
//       <TodoListView TodoListStore={todoListStore} />
//     </TodoListStoreProvider>
//   );
// }

// export default App;
