import { makeAutoObservable } from "mobx";

class CounterStore {
  count = 10;
  constructor() {
    makeAutoObservable(this);
  }
  // 使数值状态加一
  increment() {
    this.count += 1;
  }
  // 重置数值状态
  reset() {
    this.count = 0;
  }
}
export default CounterStore;
