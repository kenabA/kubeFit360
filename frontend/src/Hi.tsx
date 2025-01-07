import { useCounterStore } from "./system/stores/store";

export default function Hi() {
  const { count, incrementAsync, decrement } = useCounterStore();
  return (
    <div className="h-dvh bg-slate-700 text-white">
      <button onClick={decrement}>-</button>
      {count}
      <button onClick={incrementAsync}>+</button>
    </div>
  );
}
