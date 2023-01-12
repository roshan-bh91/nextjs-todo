interface FormData {
  todo_title?: string;
  todo_details?: string;
  isArchived?: boolean;
  isCompleted?: boolean;
}

interface EveryTodo extends FormData {
  todo_id?: string;
}
export type { EveryTodo, FormData };
