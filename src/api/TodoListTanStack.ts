const API_URL = import.meta.env.VITE_API_BASE_URL;

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const getListTodo = async (): Promise<Todo[]> => {
  const res = await fetch(`${API_URL}/todos`);
  if (!res.ok) throw new Error('Không thể tải danh sách todo!');
  return res.json();
};

export const addTodo = async (title: string): Promise<Todo> => {
  const res = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, completed: false }),
  });
  if (!res.ok) throw new Error('Không thể thêm todo!');
  return res.json();
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const res = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error('Không thể cập nhật todo!');
  return res.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Không thể xoá todo!');
};