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
      className="flex items-center bg-purple-500 text-white rounded-full px-4 py-2 mb-4 shadow-lg focus:outline-none">
      <i
        className={`mr-2 fas ${
          order === "asc" ? "fa-sort-alpha-down" : "fa-sort-alpha-up"
        }`}></i>
      Sort by Name ({order === "asc" ? "A-Z" : "Z-A"})
    </button>
  );
};

export default SortOptions;
