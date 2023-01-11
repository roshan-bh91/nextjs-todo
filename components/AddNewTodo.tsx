import { useState } from "react";
import { useTodos } from "../context/TodosProvider";
import { FormData } from "../types/todo.types";

const AddNewTodo = () => {
  const initialFormData: FormData = {
    todo_title: "",
    todo_details: "",
    isArchived: false,
    isCompleted: false,
  };
  const [formData, updateFormData] = useState(initialFormData);
  const { todo_title: current_todo_title, todo_details: current_todo_details } =
    formData;
  const handleFormChange = (
    changeEvent: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { name, value },
    } = changeEvent;
    updateFormData((formData) => ({ ...formData, [name]: value }));
  };
  const { addNewTodo } = useTodos();

  return (
    <>
      <h4>Add new todo</h4>
      <form
        className="flex flex-col"
        onSubmit={(submitEvent) => {
          submitEvent.preventDefault();
          if (
            current_todo_title !== "" &&
            current_todo_title.trim() !== "" &&
            current_todo_details !== "" &&
            current_todo_details.trim() !== ""
          ) {
            addNewTodo({ todo_id: crypto.randomUUID(), ...formData });
            updateFormData(initialFormData);
          }
        }}
      >
        <label htmlFor="">Todo Title</label>
        <input
          type="text"
          className="max-width-sm"
          name="todo_title"
          value={current_todo_title}
          onChange={handleFormChange}
        />
        <label htmlFor="">Todo Details</label>
        <input
          type="text"
          name="todo_details"
          value={current_todo_details}
          onChange={handleFormChange}
        />
        <div className="flex justify-center p-2">
          <button className="bg-slate-400 p-2" type="submit">
            create
          </button>
        </div>
      </form>
    </>
  );
};
export { AddNewTodo };
