import React from "react";

const ProductCard = ({ name, price, description, instock, onBuy }) => {
  return (
    <div className="w-64 p-4 border rounded shadow-sm bg-gray-50 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-medium mb-1">{name}</h2>
        <p className="text-gray-700 font-semibold mb-2">₹{price}</p>
        <p className="text-gray-500 text-sm mb-3">{description}</p>
      </div>

      {instock ? (
        <button
          onClick={() => onBuy(name)}
          className="w-full bg-gray-800 text-white py-1 rounded hover:bg-gray-900 transition"
        >
          Buy
        </button>
      ) : (
        <p className="text-red-500 text-sm">Out of Stock</p>
      )}
    </div>
  );
};

export default ProductCard;
