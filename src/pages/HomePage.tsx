import React, { useState } from "react";
import CharacterDetail from "../components/CharacterDetail";
import SearchBar from "../components/SearchBar";
import SortOptions from "../components/SortOptions";
import CharacterList from "../components/CharacterList";
import { Character } from "../models/Character.model";

const HomePage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.innerWidth < 1024
  );
  const [filters, setFilters] = useState<{
    gender: string;
    species: string;
  }>({ gender: "all", species: "all" });
  const [filteredCount, setFilteredCount] = useState<number>(0);

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 1024);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  const handleSort = (order: string) => {
    setSortOrder(order);
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleFilterChange = (filters: { gender: string; species: string }) => {
    setFilters(filters);
  };

  const handleFilteredCountChange = (count: number) => {
    setFilteredCount(count);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row h-full">
      {(!isMobileView || !selectedCharacter) && (
        <div className="lg:w-1/3 w-full p-4">
          <h1 className="text-3xl font-bold mb-4">Rick and Morty Characters</h1>
          <SearchBar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
          {filteredCount > 0 && <SortOptions onSort={handleSort} />}
          <div className="flex justify-between items-center mb-4">
            <span className="text-blue-500">{filteredCount} Results</span>
            {filters.gender !== "all" || filters.species !== "all" ? (
              <span className="bg-green-100 text-green-700 rounded-full px-4 py-1">
                {
                  Object.values(filters).filter((value) => value !== "all")
                    .length
                }{" "}
                Filter
                {Object.values(filters).filter((value) => value !== "all")
                  .length > 1
                  ? "s"
                  : ""}
              </span>
            ) : null}
          </div>
          <CharacterList
            query={query}
            sortOrder={sortOrder}
            filters={filters}
            onCharacterSelect={handleCharacterSelect}
            onFilteredCountChange={handleFilteredCountChange}
          />
        </div>
      )}
      {selectedCharacter && (
        <div className="lg:w-2/3 w-full p-4 h-full">
          {isMobileView && (
            <button
              onClick={() => setSelectedCharacter(null)}
              className="mb-4 text-purple-600">
              &larr; Back
            </button>
          )}
          <CharacterDetail character={selectedCharacter} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
