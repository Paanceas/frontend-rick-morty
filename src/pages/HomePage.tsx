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

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  const handleSort = (order: string) => {
    setSortOrder(order);
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="container mx-auto p-4 flex h-full">
      <div className="w-1/3 p-4">
        <h1 className="text-3xl font-bold mb-4">Rick and Morty Characters</h1>
        <SearchBar onSearch={handleSearch} />
        <SortOptions onSort={handleSort} />
        <CharacterList
          query={query}
          sortOrder={sortOrder}
          onCharacterSelect={handleCharacterSelect}
        />
      </div>
      <div className="w-2/3 p-4 h-full">
        {selectedCharacter && <CharacterDetail id={selectedCharacter.id} />}
      </div>
    </div>
  );
};

export default HomePage;
