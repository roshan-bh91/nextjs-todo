import React, { createContext, useContext, useState } from "react";
import { EveryTodo } from "../types/todo.types";
import { GlobalStateInterface, TodoProvider } from "../types/TodoProvider.type";

const TodosContext = createContext<TodoProvider>({} as TodoProvider);
const initialState = {
  pending: [],
  completed: [],
  archived: [],
};
const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [globalState, updateGlobalState] =
    useState<GlobalStateInterface>(initialState);
  const [todoSelected, editTodoSelected] = useState({} as EveryTodo);
  const addNewTodo = (currentTodoDetails: EveryTodo) => {
    updateGlobalState((prev) => ({
      ...prev,
      pending: [...prev.pending, { ...currentTodoDetails }],
    }));
  };
  const updateTodoSelected = (todoReceived: EveryTodo) => {
    editTodoSelected((prev) => ({ ...prev, ...todoReceived }));
  };
  const editExistingTodo = (todoReceived: EveryTodo) => {
    const {
      pending: pendingTodos,
      completed: completedTodos,
      archived: archivedTodos,
    } = globalState;
    const checkTodoInPending = pendingTodos.some(
      (everyTodo: EveryTodo) => everyTodo.todo_id === todoReceived.todo_id
    );
    const checkTodoInCompleted = completedTodos.some(
      (everyTodo: EveryTodo) => everyTodo.todo_id === todoReceived.todo_id
    );
    const checkTodoInArchived = archivedTodos.some(
      (everyTodo: EveryTodo) => everyTodo.todo_id === todoReceived.todo_id
    );
    if (checkTodoInPending) {
      const modifiedPendingTodosList = pendingTodos.map((everyTodo) =>
        everyTodo.todo_id === todoReceived.todo_id
          ? { ...todoReceived }
          : { ...everyTodo }
      );
      updateGlobalState((prev) => ({
        ...prev,
        pending: modifiedPendingTodosList,
      }));
    } else if (checkTodoInCompleted) {
      const modifiedCompletedTodosList = completedTodos.map((everyTodo) =>
        everyTodo.todo_id === todoReceived.todo_id
          ? { ...todoReceived }
          : { ...everyTodo }
      );
      updateGlobalState((prev) => ({
        ...prev,
        completed: modifiedCompletedTodosList,
      }));
    } else if (checkTodoInArchived) {
      const modifiedArchivedTodosList = archivedTodos.map((everyTodo) =>
        everyTodo.todo_id === todoReceived.todo_id
          ? { ...todoReceived }
          : { ...everyTodo }
      );
      updateGlobalState((prev) => ({
        ...prev,
        archived: modifiedArchivedTodosList,
      }));
    }
  };
  const deleteExistingTodo = (todoReceived: EveryTodo) => {
    const {
      pending: pendingTodos,
      completed: completedTodos,
      archived: archivedTodos,
    } = globalState;
    const checkTodoInArchives = archivedTodos.some(
      (everyTodo: EveryTodo) => everyTodo.todo_id === todoReceived.todo_id
    );
    const checkTodoInPending = pendingTodos.some(
      (everyTodo: EveryTodo) => everyTodo.todo_id === todoReceived.todo_id
    );
    const checkTodoInCompleted = completedTodos.some(
      (everyTodo: EveryTodo) => everyTodo.todo_id === todoReceived.todo_id
    );

    if (checkTodoInPending) {
      const filteredTodos = pendingTodos.filter(
        (everyTodo) => everyTodo.todo_id !== todoReceived.todo_id
      );
      updateGlobalState((prev) => ({ ...prev, pending: filteredTodos }));
    } else if (checkTodoInCompleted) {
      const filteredTodos = completedTodos.filter(
        (everyTodo) => everyTodo.todo_id !== todoReceived.todo_id
      );
      updateGlobalState((prev) => ({ ...prev, completed: filteredTodos }));
    } else if (checkTodoInArchives) {
      const filteredTodos = archivedTodos.filter(
        (everyTodo) => everyTodo.todo_id !== todoReceived.todo_id
      );
      updateGlobalState((prev) => ({ ...prev, archived: filteredTodos }));
    }
  };
  const transferExistingTodosBetweenArchivesAndPending = (
    todoReceived: EveryTodo
  ) => {
    const { pending: pendingTodos, archived: archivedTodos } = globalState;
    const checkTodoInArchived = archivedTodos.some(
      (everyTodo: EveryTodo) => everyTodo.todo_id === todoReceived.todo_id
    );
    const checkTodoInPending = pendingTodos.some(
      (everyTodo: EveryTodo) => everyTodo.todo_id === todoReceived.todo_id
    );
    if (checkTodoInPending) {
      const modifiedArchivedTodosList = pendingTodos
        .map((everyTodo: EveryTodo) =>
          everyTodo.todo_id === todoReceived.todo_id
            ? { ...todoReceived, isArchived: !todoReceived.isArchived }
            : { ...everyTodo }
        )
        .filter((everyTodo) => everyTodo.isArchived);
      const modifiedPendingTodosList = pendingTodos
        .map((everyTodo: EveryTodo) =>
          everyTodo.todo_id === todoReceived.todo_id
            ? { ...todoReceived, isArchived: !todoReceived.isArchived }
            : { ...everyTodo }
        )
        .filter((everyTodo) => !everyTodo.isArchived && !everyTodo.isCompleted);

      updateGlobalState((prev) => ({
        ...prev,
        pending: modifiedPendingTodosList,
        archived: [...prev.archived, ...modifiedArchivedTodosList],
      }));
    } else if (checkTodoInArchived) {
      const modifiedArchivedTodosList = archivedTodos
        .map((everyTodo: EveryTodo) =>
          everyTodo.todo_id === todoReceived.todo_id
            ? { ...todoReceived, isArchived: !todoReceived.isArchived }
            : { ...everyTodo }
        )
        .filter((everyTodo) => everyTodo.isArchived);
      const modifiedPendingTodosList = archivedTodos
        .map((everyTodo: EveryTodo) =>
          everyTodo.todo_id === todoReceived.todo_id
            ? { ...todoReceived, isArchived: !todoReceived.isArchived }
            : { ...everyTodo }
        )
        .filter((everyTodo) => !everyTodo.isArchived && !everyTodo.isCompleted);
      updateGlobalState((prev) => ({
        ...prev,
        pending: [...prev.pending, ...modifiedPendingTodosList],
        archived: modifiedArchivedTodosList,
      }));
    }
  };
  const transferExistingTodosBetweenCompletedAndArchives = (
    todoReceived: EveryTodo
  ) => {
    const { completed: completedTodos, archived: archivedTodos } = globalState;
    const checkTodoInCompleted = completedTodos.some(
      (everyTodo: EveryTodo) => everyTodo.todo_id === todoReceived.todo_id
    );
    const checkTodoInArchived = archivedTodos.some(
      (everyTodo: EveryTodo) => everyTodo.todo_id === todoReceived.todo_id
    );
    if (checkTodoInCompleted) {
      const modifiedCompletedTodosList = completedTodos
        .map((everyTodo: EveryTodo) =>
          todoReceived.todo_id === everyTodo.todo_id
            ? { ...todoReceived, isArchived: !todoReceived.isArchived }
            : { ...everyTodo }
        )
        .filter(
          (everyTodo: EveryTodo) =>
            everyTodo.isCompleted && !everyTodo.isArchived
        );
      const modifiedArchivedTodosList = completedTodos
        .map((everyTodo: EveryTodo) =>
          todoReceived.todo_id === everyTodo.todo_id
            ? { ...todoReceived, isArchived: !todoReceived.isArchived }
            : { ...everyTodo }
        )
        .filter((everyTodo: EveryTodo) => everyTodo.isArchived);
      updateGlobalState((prev) => ({
        ...prev,
        completed: modifiedCompletedTodosList,
        archived: [...prev.archived, ...modifiedArchivedTodosList],
      }));
    } else if (checkTodoInArchived) {
      const modifiedCompletedTodosList = archivedTodos
        .map((everyTodo: EveryTodo) =>
          todoReceived.todo_id === everyTodo.todo_id
            ? { ...todoReceived, isArchived: !todoReceived.isArchived }
            : { ...everyTodo }
        )
        .filter(
          (everyTodo: EveryTodo) =>
            everyTodo.isCompleted && !everyTodo.isArchived
        );
      const modifiedArchivedTodosList = archivedTodos
        .map((everyTodo: EveryTodo) =>
          todoReceived.todo_id === everyTodo.todo_id
            ? { ...todoReceived, isArchived: !todoReceived.isArchived }
            : { ...everyTodo }
        )
        .filter((everyTodo: EveryTodo) => everyTodo.isArchived);
      updateGlobalState((prev) => ({
        ...prev,
        completed: [...prev.completed, ...modifiedCompletedTodosList],
        archived: modifiedArchivedTodosList,
      }));
    }
  };
  const transferExistingTodosBetweenPendingAndCompleted = (
    todoReceived: EveryTodo
  ) => {
    const { pending: pendingTodos, completed: completedTodos } = globalState;
    const checkTodoInPending = pendingTodos.some(
      (everyTodo: EveryTodo) => everyTodo.todo_id === todoReceived.todo_id
    );
    const checkTodoInCompleted = completedTodos.some(
      (everyTodo: EveryTodo) => everyTodo.todo_id === todoReceived.todo_id
    );
    if (checkTodoInCompleted) {
      const modifiedCompletedTodosList = completedTodos
        .map((everyTodo: EveryTodo) =>
          everyTodo.todo_id === todoReceived.todo_id
            ? { ...todoReceived, isCompleted: !todoReceived.isCompleted }
            : { ...everyTodo }
        )
        .filter((everyTodo) => everyTodo.isCompleted);
      const modifiedPendingTodosList = completedTodos
        .map((everyTodo: EveryTodo) =>
          everyTodo.todo_id === todoReceived.todo_id
            ? { ...todoReceived, isCompleted: !todoReceived.isCompleted }
            : { ...everyTodo }
        )
        .filter((everyTodo) => !everyTodo.isCompleted && !everyTodo.isArchived);
      updateGlobalState((prev) => ({
        ...prev,
        pending: [...prev.pending, ...modifiedPendingTodosList],
        completed: modifiedCompletedTodosList,
      }));
    } else if (checkTodoInPending) {
      const modifiedCompletedTodosList = pendingTodos
        .map((everyTodo: EveryTodo) =>
          everyTodo.todo_id === todoReceived.todo_id
            ? { ...todoReceived, isCompleted: !todoReceived.isCompleted }
            : { ...everyTodo }
        )
        .filter((everyTodo) => everyTodo.isCompleted);
      const modifiedPendingTodosList = pendingTodos
        .map((everyTodo: EveryTodo) =>
          everyTodo.todo_id === todoReceived.todo_id
            ? { ...todoReceived, isCompleted: !todoReceived.isCompleted }
            : { ...everyTodo }
        )
        .filter((everyTodo) => !everyTodo.isCompleted && !everyTodo.isArchived);
      updateGlobalState((prev) => ({
        ...prev,
        pending: modifiedPendingTodosList,
        completed: [...prev.completed, ...modifiedCompletedTodosList],
      }));
    }
  };
  return (
    <TodosContext.Provider
      value={{
        globalState,
        todoSelected,
        editTodoSelected,
        updateTodoSelected,
        addNewTodo,
        editExistingTodo,
        deleteExistingTodo,
        transferExistingTodosBetweenArchivesAndPending,
        transferExistingTodosBetweenCompletedAndArchives,
        transferExistingTodosBetweenPendingAndCompleted,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
const useTodos = () => {
  const contextReceived = useContext(TodosContext);
  if (contextReceived === undefined) {
    throw new Error("useTodos custom hook must be used within Todos Provider");
  }
  return contextReceived;
};
export { TodosProvider, useTodos };
