import React, { Dispatch, SetStateAction } from "react";
import { EveryTodo } from "./todo.types";
interface GlobalStateInterface {
  pending: EveryTodo[];
  archived: EveryTodo[];
  completed: EveryTodo[];
}

interface TodoProvider {
  globalState: GlobalStateInterface;
  todoSelected: EveryTodo;
  editTodoSelected: Dispatch<SetStateAction<EveryTodo>>;
  editExistingTodo: (todoGiven: EveryTodo) => void;
  updateTodoSelected: (todoGiven: EveryTodo) => void;
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

export type { GlobalStateInterface, TodoProvider };
