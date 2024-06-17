import React, { useState, useCallback } from "react";

interface SortOptionsProps {
  onSort: (order: string) => void;
  initialOrder?: string;
}

const SortOptions: React.FC<SortOptionsProps> = ({
  onSort,
  initialOrder = "asc",
}) => {
  const [order, setOrder] = useState<string>(initialOrder);

  const handleSort = useCallback(() => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    onSort(newOrder);
  }, [order, onSort]);

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
