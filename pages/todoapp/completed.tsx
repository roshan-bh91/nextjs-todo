import { useTodos } from "../../context/TodosProvider";
import { EveryTodo } from "../../types/todo.types";

const Completed = () => {
  const {
    globalState: { completed },
    transferExistingTodosBetweenPendingAndCompleted,
    transferExistingTodosBetweenCompletedAndArchives,
    deleteExistingTodo,
  } = useTodos();
  return (
    <>
      <h4>Welcome to the completed todos section</h4>
      <div>
        {completed.length === 0 ? (
          <h4>No todos yet</h4>
        ) : (
          <ul>
            {completed.map((everyEl: EveryTodo) => {
              return (
                <div
                  key={everyEl.todo_id}
                  className="flex flex-row gap-x-2 p-2"
                >
                  <li>
                    {everyEl.todo_title}:{everyEl.todo_details}
                  </li>
                  <button onClick={() => {}}>Archive</button>
                  <button
                    onClick={() => {
                      transferExistingTodosBetweenPendingAndCompleted(everyEl);
                    }}
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => {
                      deleteExistingTodo(everyEl);
                    }}
                  >DELETE</button>
                </div>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};
export default Completed;
