import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-2 mb-4">
      <i className="fas fa-search text-gray-500 ml-2"></i>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search or filter results"
        className="bg-gray-100 rounded-full px-4 py-2 w-full focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-primary600 text-white rounded-full px-4 py-2 ml-2">
        <i className="fas fa-sliders-h"></i>
      </button>
    </div>
  );
};

export default SearchBar;
