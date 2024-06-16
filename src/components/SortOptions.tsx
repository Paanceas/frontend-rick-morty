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
      className="bg-blue-500 text-white rounded px-3 py-2 mb-4">
      Sort by Name ({order === "asc" ? "A-Z" : "Z-A"})
    </button>
  );
};

export default SortOptions;
