import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: { gender: string; species: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterChange }) => {
  const [query, setQuery] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("all");
  const [species, setSpecies] = useState<string>("all");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFilter = () => {
    onFilterChange({ gender, species });
    setShowFilter(false);
  };

  return (
    <div className="relative mb-4">
      <div className="flex items-center bg-gray-100 rounded-lg p-2">
        <i className="fas fa-search text-gray-500 ml-2"></i>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search or filter results"
          className="bg-gray-100 rounded-lg px-4 py-2 w-full focus:outline-none"
        />
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`rounded-lg p-2 ml-2 transition-colors duration-300 ${
            showFilter ? "bg-purple-100 text-purple-700" : "text-purple-700"
          } hover:bg-purple-100 hover:text-purple-700`}>
          <i className="fas fa-sliders-h"></i>
        </button>
      </div>
      {showFilter && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-full z-10">
          <div className="mb-4">
            <h3 className="text-gray-600 mb-2">Gender</h3>
            <div className="flex space-x-2 w-full">
              <button
                onClick={() => setGender("all")}
                className={`flex-1 rounded-lg px-4 py-2 ${
                  gender === "all"
                    ? "bg-primary100 text-primary700"
                    : "bg-white text-gray-900 border border-gray-300"
                }`}>
                All
              </button>
              <button
                onClick={() => setGender("Male")}
                className={`flex-1 rounded-lg px-4 py-2 ${
                  gender === "Male"
                    ? "bg-primary100 text-primary700"
                    : "bg-white text-gray-900 border border-gray-300"
                }`}>
                Male
              </button>
              <button
                onClick={() => setGender("Female")}
                className={`flex-1 rounded-lg px-4 py-2 ${
                  gender === "Female"
                    ? "bg-primary100 text-primary700"
                    : "bg-white text-gray-900 border border-gray-300"
                }`}>
                Female
              </button>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-gray-600 mb-2">Specie</h3>
            <div className="flex space-x-2 w-full">
              <button
                onClick={() => setSpecies("all")}
                className={`flex-1 rounded-lg px-4 py-2 ${
                  species === "all"
                    ? "bg-primary100 text-primary700"
                    : "bg-white text-gray-900 border border-gray-300"
                }`}>
                All
              </button>
              <button
                onClick={() => setSpecies("Human")}
                className={`flex-1 rounded-lg px-4 py-2 ${
                  species === "Human"
                    ? "bg-primary100 text-primary700"
                    : "bg-white text-gray-900 border border-gray-300"
                }`}>
                Human
              </button>
              <button
                onClick={() => setSpecies("Alien")}
                className={`flex-1 rounded-lg px-4 py-2 ${
                  species === "Alien"
                    ? "bg-primary100 text-primary700"
                    : "bg-white text-gray-900 border border-gray-300"
                }`}>
                Alien
              </button>
            </div>
          </div>
          <button
            onClick={handleFilter}
            className="bg-primary600 text-white rounded-lg px-4 py-2 w-full">
            Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
