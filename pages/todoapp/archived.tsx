import { useTodos } from "../../context/TodosProvider";
import { EveryTodo } from "../../types/todo.types";

const Archived = () => {
  const {
    globalState: { archived },
    transferExistingTodosBetweenCompletedAndArchives,
    transferExistingTodosBetweenArchivesAndPending,
    deleteExistingTodo,
  } = useTodos();
  return (
    <>
      <h4>Wekcome to the archived todos section</h4>
      {archived.length === 0 ? (
        <h4>no archived notes</h4>
      ) : (
        <ul className="">
          {archived.map((everyEl: EveryTodo) => {
            return (
              <div key={everyEl.todo_id} className="flex flex-row gap-x-2 p-2">
                <li>
                  {everyEl.todo_title}:{everyEl.todo_details}
                </li>
                <button
                  onClick={() => {
                    transferExistingTodosBetweenArchivesAndPending(everyEl);
                  }}
                >
                  Restore
                </button>
                <button
                  onClick={() => {
                    deleteExistingTodo(everyEl);
                  }}
                >
                  DELETE
                </button>
              </div>
            );
          })}
        </ul>
      )}
    </>
  );
};
export default Archived;
