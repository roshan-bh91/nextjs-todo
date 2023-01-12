import { useTodos, useModal } from "../../context";
import { EveryTodo } from "../../types";
import {
  Archive,
  Delete,
  Edit,
  FillCheck,
  OutlineCheck,
  Pending,
} from "../../icons";

const Archived = () => {
  const {
    globalState: { archived },
    transferExistingTodosBetweenCompletedAndArchives,
    transferExistingTodosBetweenArchivesAndPending,
    deleteExistingTodo,
    updateTodoSelected,
  } = useTodos();
  const { openModal } = useModal();
  return (
    <>
      <h4 className="flex items-center">
        Welcome to the archived todos section{" "}
        <span>
          <Archive size={25} className="inline" />
        </span>
      </h4>
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
                {everyEl.isCompleted ? (
                  <button
                    onClick={() => {
                      transferExistingTodosBetweenCompletedAndArchives(everyEl);
                    }}
                  >
                    <FillCheck />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      transferExistingTodosBetweenArchivesAndPending(everyEl);
                    }}
                  >
                    <Pending size={25} />
                  </button>
                )}

                <button
                  onClick={() => {
                    openModal();
                    updateTodoSelected(everyEl);
                  }}
                >
                  <Edit size={25} />
                </button>
                <button
                  onClick={() => {
                    deleteExistingTodo(everyEl);
                  }}
                >
                  <Delete color="red" size={25} />
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
