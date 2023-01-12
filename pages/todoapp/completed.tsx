import { useModal, useTodos } from "../../context/";
import { Archive, Delete, Edit, FillCheck, Pending } from "../../icons";
import { EveryTodo } from "../../types/";

const Completed = () => {
  const {
    globalState: { completed },
    transferExistingTodosBetweenPendingAndCompleted,
    transferExistingTodosBetweenCompletedAndArchives,
    deleteExistingTodo,
    updateTodoSelected,
  } = useTodos();
  const { openModal } = useModal();
  return (
    <>
      <h4>
        Welcome to the completed todos section <FillCheck size={25} />
      </h4>
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
                  <button
                    onClick={() => {
                      transferExistingTodosBetweenCompletedAndArchives(everyEl);
                    }}
                  >
                    <Archive />
                  </button>
                  <button
                    onClick={() => {
                      transferExistingTodosBetweenPendingAndCompleted(everyEl);
                    }}
                  >
                    <Pending />
                  </button>
                  <button
                    onClick={() => {
                      openModal();
                      updateTodoSelected(everyEl);
                    }}
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={() => {
                      deleteExistingTodo(everyEl);
                    }}
                  >
                    <Delete />
                  </button>
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
