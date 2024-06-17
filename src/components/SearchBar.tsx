import React, { useState, useCallback, useEffect } from "react";
import FilterOptions from "./FilterOptions";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: { gender: string; species: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterChange }) => {
  const [query, setQuery] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("all");
  const [species, setSpecies] = useState<string>("all");

  const handleSearch = useCallback(() => {
    onSearch(query);
  }, [query, onSearch]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const handleFilterChange = useCallback(() => {
    onFilterChange({ gender, species });
    setShowFilter(false);
  }, [gender, species, onFilterChange]);

  useEffect(() => {
    if (query === "") {
      handleSearch();
    }
  }, [query, handleSearch]);

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
        <FilterOptions
          gender={gender}
          species={species}
          setGender={setGender}
          setSpecies={setSpecies}
          onApplyFilter={handleFilterChange}
        />
      )}
    </div>
  );
};

export default SearchBar;
