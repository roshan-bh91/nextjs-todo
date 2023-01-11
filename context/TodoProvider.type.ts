import { EveryTodo } from "../types/todo.types";
interface GlobalStateInterface {
  pending: EveryTodo[];
  archived: EveryTodo[];
  completed: EveryTodo[];
}

interface TodoProvider {
  globalState: GlobalStateInterface;
  addNewTodo: (todoGiven: EveryTodo) => void;
  deleteExistingTodo: (todoGiven: EveryTodo) => void;
  transferExistingTodosBetweenArchivesAndPending: (
    todoGiven: EveryTodo
  ) => void;
  transferExistingTodosBetweenCompletedAndArchives: (
    todoGiven: EveryTodo
  ) => void;
  transferExistingTodosBetweenPendingAndCompleted: (
    todoGiven: EveryTodo
  ) => void;
}

export type { GlobalStateInterface,TodoProvider };
