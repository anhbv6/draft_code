import { useState, useRef } from "react";
import { useTodoListTanStack } from "./hooks";
import { type Todo } from "../../api/TodoListTanStack";
import "./todolist.css";
import {Plus, Sparkles} from "lucide-react";
import toast from "react-hot-toast";
import TodoItem from "./components/TodoItem";

/* ─── Filter type ─── */
type FilterType = "all" | "active" | "completed";

/* ─── Main Component ─── */
export default function TodoListTanStack() {
  const { 
    todos, 
    isLoading, 
    isError, 
    error,
    addTodoHooks,
    updateTodoHooks,
    deleteTodoHooks,
  } = useTodoListTanStack();

  const [newTitle, setNewTitle] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = async () => {
    try {
      const textTrim = newTitle.trim();
      if (textTrim === "") return;
      await addTodoHooks(textTrim);
      toast.success("Todo added");

      setNewTitle("");
      inputRef.current?.focus();
    } catch {
      toast.error("Add todo failed");
    }
  };

  const handleEdit = (todo: Todo, title: string) => {
    updateTodoHooks({...todo, title})
  }

  const handleToggle = (todo: Todo) => {
    updateTodoHooks({...todo, completed: !todo.completed})
  }

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const totalDoing = todos.filter((item) => item.completed === false).length;
  const totalCompleted = todos.filter((item) => item.completed === true).length;

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "Tất cả" },
    { key: "active", label: "Đang làm" },
    { key: "completed", label: "Hoàn thành" },
  ];

  /* ─── Loading State ─── */
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 animate-spin rounded-full border-3 border-surface-lighter border-t-primary" />
          <p className="text-sm text-text-muted animate-pulse">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  /* ─── Error State ─── */
  if (isError) {
    return (
      <div className="flex h-full items-center justify-center bg-bg">
        <div className="rounded-2xl bg-danger/10 border border-danger/20 px-8 py-6 text-center">
          <p className="text-danger font-semibold text-lg mb-1">Lỗi rồi!</p>
          <p className="text-text-muted text-sm">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-start justify-center bg-bg overflow-y-auto py-10 px-4">
      <div className="w-full max-w-lg">
        {/* ─── Header ─── */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-text tracking-tight font-sans">
            Todo List
          </h1>
          <p className="mt-1.5 text-sm text-text-muted flex items-center justify-center gap-1">
            Quản lý công việc hiệu quả mỗi ngày <Sparkles size={18}/>
          </p>
        </div>

        {/* ─── Stats ─── */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {[
            { label: "Total task", value: todos.length, color: "text-primary-light" },
            { label: "Doing", value: totalDoing, color: "text-accent" },
            { label: "Completed", value: totalCompleted, color: "text-success" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-surface p-3 text-center transition-all duration-300 hover:bg-surface-light">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-text-muted mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ─── Add input ─── */}
        <div className="mb-5 flex gap-2">
          <input
            ref={inputRef}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a new task..."
            className="flex-1 rounded-xl border border-surface-lighter bg-surface px-4 py-3 text-sm text-white placeholder-text-muted/50 outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={handleAdd}
            // disabled={isAdding || !newTitle.trim()}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          >
            <Plus size={16}/>
            <span>Thêm</span>
          </button>
        </div>

        {/* ─── Filter tabs ─── */}
        <div className="mb-4 flex gap-1 rounded-xl bg-surface p-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all duration-300 cursor-pointer ${
                filter === f.key
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "text-text-muted hover:text-text hover:bg-surface-lighter/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ─── Todo List ─── */}
        <div className="rounded-2xl bg-surface p-2 max-h-[400px] overflow-auto disableScrollBar">
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-4xl mb-3">🎉</p>
              <p className="text-sm text-text-muted">
                {filter === "completed" ? "Chưa có việc nào hoàn thành" : filter === "active" ? "Tuyệt vời! Không còn việc cần làm" : "Danh sách trống. Thêm việc mới nào!"}
              </p>
            </div>
          ) : (
            <ul className="flex flex-col">
              {filtered.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={(id) => deleteTodoHooks(id)}
                  onEdit={handleEdit}
                />
              ))}
            </ul>
          )}
        </div>

        {/* ─── Footer ─── */}
        {todos.length > 0 && (
          <p className="mt-4 text-center text-xs text-text-muted/60">
            {totalDoing} việc còn lại · {totalCompleted} đã hoàn thành
          </p>
        )}
      </div>
    </div>
  );
}