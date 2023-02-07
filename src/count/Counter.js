import { observer } from "mobx-react-lite";

function Counter({ counterStore }) {
  return (
    <div>
      <p className="paragraph">{counterStore.count}</p>
      <button onClick={() => counterStore.increment()} className="button">
        加 1
      </button>
      <button onClick={() => counterStore.reset()} className="button">
        重置
      </button>
    </div>
  );
}
// observer: 监控当前组件使用到的由 MobX 跟踪的 observable state, 当状态发生变化时通知 React 更新视图
export default observer(Counter);
