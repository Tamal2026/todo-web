import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import "./index.css"; // Ensure you have Tailwind CSS imported

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("Low");
  const [selectedDate, setSelectedDate] = useState("");
  const [displayedDate, setDisplayedDate] = useState("");

  const addTodo = () => {
    console.log("Adding todo:", input, selectedOption, selectedDate); // Logging for debugging
    if (input.trim() !== "" && selectedDate !== "") {
      const newTodo = {
        text: input,
        priority: selectedOption,
        date: selectedDate,
      };
      console.log("New todo:", newTodo); // Logging for debugging
      setTodos([...todos, newTodo]);
      setInput("");
      console.log("Todos after addition:", [...todos, newTodo]); // Logging for debugging
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setDisplayedDate(e.target.value);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <div className="flex items-center justify-around">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
          <div className="flex items-center">
            <h1 className="text-xl font-semi-bold mr-2">Date:</h1>
            <span className="text-xl">{displayedDate}</span>
          </div>
        </div>
        <div className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded mr-2"
            placeholder="Add a new todo"
          />
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="p-2 border border-gray-300 rounded mr-2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button
            onClick={addTodo}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
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
