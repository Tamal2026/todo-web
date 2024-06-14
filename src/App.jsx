import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import './index.css'; // Ensure you have Tailwind CSS imported

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("Low");
  const [selectedDate, setSelectedDate] = useState("");

  const addTodo = () => {
    if (input.trim() !== "" && selectedDate !== "") {
      setTodos([...todos, { text: input, priority: selectedOption, date: selectedDate }]);
      setInput("");
      setSelectedDate("");
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
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
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border border-gray-300 rounded mr-2"
          />
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
              {index + 1}. {todo.text} - <span className="text-sm font-semibold">{todo.priority}</span> - <span className="text-sm font-semibold">{todo.date}</span>
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
