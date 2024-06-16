import React, { useState, useEffect } from "react";
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
  const [filters, setFilters] = useState<{
    characterType: string;
    species: string;
  }>({
    characterType: "all",
    species: "all",
  });
  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.innerWidth < 1024
  );

  const handleResize = () => {
    setIsMobileView(window.innerWidth < 1024);
  };

  useEffect(() => {
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

  const handleFilterChange = (newFilters: {
    characterType: string;
    species: string;
  }) => {
    setFilters(newFilters);
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
          <SortOptions onSort={handleSort} />
          <CharacterList
            query={query}
            sortOrder={sortOrder}
            filters={filters}
            onCharacterSelect={handleCharacterSelect}
          />
        </div>
      )}
      {selectedCharacter && (
        <div className="lg:w-2/3 w-full p-4 h-full">
          {isMobileView && (
            <button
              onClick={() => setSelectedCharacter(null)}
              className="mb-4 text-purple-600 flex items-center">
              <i className="fas fa-arrow-left mr-2"></i> Back
            </button>
          )}
          <CharacterDetail id={selectedCharacter.id} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
