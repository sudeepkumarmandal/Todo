import React, { useState, useEffect, useRef } from "react";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState([]);
  const [update, setUpdate] = useState(null);

  const inputRef = useRef(null); //  create ref

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAdd = () => {
    if (!inputValue.trim()) return; // avoid empty todos

    if (update) {
      const updatedTodo = todo.map((item) =>
        update.id === item.id ? { ...item, title: inputValue } : item
      );
      setTodo(updatedTodo);
      setUpdate(null);
    } else {
      setTodo([...todo, { id: Date.now(), title: inputValue }]);
    }
    setInputValue("");

    inputRef.current.focus(); //  keep focus after add
  };

  const handleDelete = (id) => {
    setTodo(todo.filter((item) => item.id !== id));
    inputRef.current.focus(); //  keep focus after delete
  };

  const handleReset = () => {
    setTodo([]);
    setInputValue("");
    inputRef.current.focus(); //  keep focus after reset
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  const handleUpdate = (item) => {
    setUpdate(item);
    setInputValue(item.title);
    inputRef.current.focus(); //  focus input when editing
  };

  useEffect(() => {
    inputRef.current.focus(); //  focus on mount
  }, []);

  return (
    <div className="min-h-screen bg-gray-600 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
          📝 Add Your Tasks Here...
        </h1>

        {/* Input + Button */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            ref={inputRef} //  attach ref
            placeholder="Enter a task..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={handleChange}
            value={inputValue}
            onKeyDown={handleEnter}
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {update ? "Update" : "Add"}
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-3">
          {todo.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks yet ✨</p>
          ) : (
            todo.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <span className="text-gray-700">{item.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(item)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        {/* Reset Button */}
        {todo.length > 0 && (
          <button
            onClick={handleReset}
            className="w-full mt-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default Todo;
