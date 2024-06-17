import React from "react";
import { useForm } from "react-hook-form";
import { MdDeleteForever, MdDateRange } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./index.css"; // Ensure you have Tailwind CSS imported

function App() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [todos, setTodos] = React.useState([]);
  const selectedDate = watch("selectedDate");

  const addTodo = (data) => {
    const { input, selectedDate, priority } = data;
    if (input.trim() !== "" && selectedDate) {
      const newTodo = {
        text: input,
        priority,
        date: new Date(selectedDate).toISOString().split("T")[0],
      };
      setTodos([...todos, newTodo]);
      setValue("input", "");
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleDateChange = (date) => {
    setValue("selectedDate", date);
    const currentDate = new Date().toISOString().slice(0, 10);
    if (date.toISOString().slice(0, 10) < currentDate) {
      setValue("dateError", true);
    } else {
      setValue("dateError", false);
    }
  };

  const saveTodos = async (data) => {
    const email = data.email; // Get the email from form data
    try {
      const response = await axios.post("http://localhost:5000/todos", {
        email,
        totalTodos: todos.length,
        todos
      });

      if (response.status === 200) {
        console.log("Todos saved successfully");
      } else {
        console.error("Failed to save todos");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <form onSubmit={handleSubmit(addTodo)}>
          <div className="flex items-center justify-between">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={new Date()}
              customInput={
                <button
                  type="button"
                  className="p-2 border border-gray-300 rounded bg-white hover:bg-gray-200"
                >
                  <MdDateRange size={24} />
                </button>
              }
              dateFormat="yyyy-MM-dd"
            />
            <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
            <div className="flex items-center">
              <h1 className="text-xl font-semi-bold mr-2">Date:</h1>
              <span className="text-xl">
                {selectedDate
                  ? new Date(selectedDate).toISOString().split("T")[0]
                  : ""}
              </span>
            </div>
          </div>
          <label htmlFor="priority-select" className="mr-2 font-bold">
            Priority
          </label>
          {errors.dateError && (
            <p className="text-red-500 text-sm mt-1 mb-4">
              Please select today or an upcoming date!
            </p>
          )}
          <div className="flex mb-4">
            <select
              id="priority-select"
              {...register("priority")}
              defaultValue="Low"
              className="p-2 border border-gray-300 rounded mr-2"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input
              type="text"
              {...register("input", { required: true })}
              className="flex-grow p-2 border border-gray-300 rounded mr-2"
              placeholder="Add a new todo"
            />
            <button
              type="submit"
              disabled={errors.dateError || !selectedDate}
              className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${
                errors.dateError || !selectedDate
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Add
            </button>
          </div>
        </form>
        <form onSubmit={handleSubmit(saveTodos)}>
          <div className="mb-4">
            <label htmlFor="email" className="font-bold mr-2">Email:</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 mb-4"
          >
            Save
          </button>
        </form>
        <ul className="list-disc pl-5">
          {todos.map((todo, index) => (
            <li
              className="flex items-center justify-between mb-2 p-2 bg-gray-100 rounded"
              key={index}
            >
              {index + 1}. {todo.text} -{" "}
              <span className="text-sm font-semibold">{todo.priority}</span>
              <button
                onClick={() => removeTodo(index)}
                className="text-red-500 hover:text-red-700"
              >
                <MdDeleteForever size={24} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
