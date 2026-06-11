import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getListTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  type Todo,
} from "../../api/TodoListTanStack";

const QUERY_KEY = ["todos"];

export const useTodoListTanStack = () => {
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: getListTodo,
    });

    const addMutation = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEY,
            })
        }
    })

    const updateMutation = useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEY,
            })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEY,
            })
        }
    })

    return {
        todos: (data ?? []) as Todo[],
        isLoading,
        isError,
        error,
        addTodoHooks: addMutation.mutateAsync,
        updateTodoHooks: updateMutation.mutateAsync,
        deleteTodoHooks: deleteMutation.mutateAsync,
    };
};