import React, { useState } from "react";

interface SortOptionsProps {
  onSort: (order: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ onSort }) => {
  const [order, setOrder] = useState<string>("asc");

  const handleSort = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    onSort(newOrder);
  };

  return (
    <button
      onClick={handleSort}
      className="flex items-center bg-transparent text-purple-700 rounded px-3 py-2 mb-4 transition-colors duration-300 hover:bg-purple-100 hover:text-purple-700">
      <span>Sort by Name ({order === "asc" ? "A-Z" : "Z-A"})</span>
      <i
        className={`ml-2 fas ${
          order === "asc" ? "fa-sort-alpha-down" : "fa-sort-alpha-up"
        }`}></i>
    </button>
  );
};

export default SortOptions;
