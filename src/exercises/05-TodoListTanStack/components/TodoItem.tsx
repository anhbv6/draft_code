import React, { useEffect, useRef, useState } from 'react'
import type { Todo } from '../../../api/TodoListTanStack';
import { Check, Pencil, Trash, X } from 'lucide-react';

type TodoItemProps = {
    todo: Todo;
    onToggle: (t: Todo) => void;
    onDelete: (id: number) => void;
    onEdit: (t: Todo, title: string) => void;
}

const TodoItem = ({
    todo,
    onToggle,
    onDelete,
    onEdit,
} : TodoItemProps) => {

    const [editing, setEditing] = useState(false);
    const [editText, setEditText] = useState(todo.title);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editing) inputRef.current?.focus();
    }, [editing]);

    const handleSave = () => {
        const trimmed = editText.trim();
        if (trimmed && trimmed !== todo.title) onEdit(todo, trimmed);
        setEditing(false);
    };
    return (
        <li
            className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-surface-lighter/60 ${
                todo.completed ? "opacity-60" : ""
            }`}
        >
            {/* Checkbox */}
            <button
                onClick={() => onToggle(todo)}
                className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 cursor-pointer ${
                todo.completed
                    ? "border-success bg-success text-bg"
                    : "border-text-muted/40 hover:border-primary-light"
                }`}
            >
                {todo.completed && <Check />}
            </button>

            {/* Title / Edit */}
            {editing ? (
                <input
                    ref={inputRef}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave();
                        if (e.key === "Escape") { setEditing(false); setEditText(todo.title); }
                    }}
                    onBlur={handleSave}
                    className="flex-1 rounded-lg border border-primary/40 bg-surface px-3 py-1 text-sm text-white outline-none focus:border-primary-light"
                />
            ) : (
                <span
                    className={`flex-1 text-sm leading-snug transition-all duration-300 ${
                        todo.completed ? "text-text-muted line-through" : "text-text"
                    }`}
                >
                    {todo.title}
                </span>
            )}

            {/* Action buttons */}
            <div className="flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {!editing && !todo.completed && (
                    <button
                        onClick={() => { setEditText(todo.title); setEditing(true); }}
                        className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-primary/20 hover:text-primary-light cursor-pointer"
                    >
                        <Pencil />
                    </button>
                )}
                {editing ? (
                    <button
                        onClick={() => { setEditing(false); setEditText(todo.title); }}
                        className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-danger/20 hover:text-danger cursor-pointer"
                    >
                        <X />
                    </button>
                    ) : (
                    <button
                        onClick={() => onDelete(todo.id)}
                        className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-danger/20 hover:text-danger cursor-pointer"
                    >
                        <Trash />
                    </button>
                )}
            </div>
        </li>
    )
}

export default TodoItem