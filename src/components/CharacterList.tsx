import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import CharacterCard from "./CharacterCard";
import { Character } from "../models/Character.model";
import { GET_CHARACTERS_FILTER } from "../graphql/queries/getCharactersFilter";

interface CharacterListProps {
  query: string;
  sortOrder: string;
  filters: { characterType: string; species: string };
  onCharacterSelect: (character: Character) => void;
  onFilteredCountChange: (count: number) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  query,
  sortOrder,
  filters,
  onCharacterSelect,
  onFilteredCountChange,
}) => {
  const { loading, error, data } = useQuery(GET_CHARACTERS_FILTER, {
    variables: { filter: { name: query }, orderBy: { name: sortOrder } },
  });
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null
  );
  const [favoriteCharacters, setFavoriteCharacters] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      let filteredCharacters = data.characters.results;

      if (filters.characterType === "starred") {
        filteredCharacters = filteredCharacters.filter((character: Character) =>
          favoriteCharacters.includes(character.id)
        );
      } else if (filters.characterType === "others") {
        filteredCharacters = filteredCharacters.filter(
          (character: Character) => !favoriteCharacters.includes(character.id)
        );
      }

      if (filters.species !== "all") {
        filteredCharacters = filteredCharacters.filter(
          (character: Character) => character.species === filters.species
        );
      }

      onFilteredCountChange(filteredCharacters.length);
    }
  }, [data, filters, favoriteCharacters, onFilteredCountChange]);

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacterId(character.id);
    onCharacterSelect(character);
  };

  const handleToggleFavorite = (characterId: string) => {
    setFavoriteCharacters((prev) =>
      prev.includes(characterId)
        ? prev.filter((id) => id !== characterId)
        : [...prev, characterId]
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let filteredCharacters = data.characters.results;

  if (filters.characterType === "starred") {
    filteredCharacters = filteredCharacters.filter((character: Character) =>
      favoriteCharacters.includes(character.id)
    );
  } else if (filters.characterType === "others") {
    filteredCharacters = filteredCharacters.filter(
      (character: Character) => !favoriteCharacters.includes(character.id)
    );
  }

  if (filters.species !== "all") {
    filteredCharacters = filteredCharacters.filter(
      (character: Character) => character.species === filters.species
    );
  }

  const sortedCharacters = [...filteredCharacters].sort((a, b) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Starred Characters</h3>
      {sortedCharacters
        .filter((character: Character) =>
          favoriteCharacters.includes(character.id)
        )
        .map((character: Character, index: number) => (
          <CharacterCard
            key={character.id}
            character={{
              ...character,
              isFavorite: favoriteCharacters.includes(character.id),
            }}
            onClick={() => handleCharacterClick(character)}
            isSelected={character.id === selectedCharacterId}
            onToggleFavorite={() => handleToggleFavorite(character.id)}
            isLastItem={index === sortedCharacters.length - 1}
          />
        ))}
      <h3 className="text-lg font-semibold mb-2">Characters</h3>
      {sortedCharacters
        .filter(
          (character: Character) => !favoriteCharacters.includes(character.id)
        )
        .map((character: Character, index: number) => (
          <CharacterCard
            key={character.id}
            character={{
              ...character,
              isFavorite: favoriteCharacters.includes(character.id),
            }}
            onClick={() => handleCharacterClick(character)}
            isSelected={character.id === selectedCharacterId}
            onToggleFavorite={() => handleToggleFavorite(character.id)}
            isLastItem={index === sortedCharacters.length - 1}
          />
        ))}
    </div>
  );
};

export default CharacterList;
