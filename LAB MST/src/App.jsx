import React, { useState } from "react";
import ProductCard from "./productCard";

const App = () => {
  const [todo, setTodo] = useState("");
  const [tasks, setTasks] = useState([]);
  const [popup, setPopup] = useState(""); 
  const showPopup = (message) => {
    setPopup(message);
    setTimeout(() => setPopup(""), 2000); 
  };
  const handleAddTask = () => {
    if (todo.trim()) {
      setTasks([...tasks, todo.trim()]);
      setTodo("");
      showPopup("Task added to list!"); 
    }
  };
  const handleRemoveTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };
  const handleBuy = (productName) => {
    showPopup(`${productName} added to cart!`);
  };
  return (
    <div className="bg-gray-50 min-h-screen p-6 relative">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Product Showcase
      </h1>

      <div className="grid grid-cols-3 gap-8 justify-items-center mb-12">
        <ProductCard
          name="Mobile Phone"
          price={10000}
          description="Best Battery Phone"
          instock={true}
          onBuy={handleBuy}
        />
        <ProductCard
          name="KeyBoard and Mouse"
          price={2500}
          description="Low Latency"
          instock={true}
          onBuy={handleBuy}
        />
        <ProductCard
          name="Gaming Laptop"
          price={55000}
          description="Dedicated GPU"
          instock={false}
          onBuy={handleBuy}
        />
      </div>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">To-Do List</h2>

        <div className="flex mb-6">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTask(); // Add on Enter
            }}
            className="flex-1 p-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add a new task"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-gray-400 text-center">No tasks yet!</p>
          )}
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200 transition"
            >
              <span className="text-gray-800">{task}</span>
              <button
                onClick={() => handleRemoveTask(index)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      {popup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {popup}
        </div>
      )}
    </div>
  );
};

export default App;
