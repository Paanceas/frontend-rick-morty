import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import CharacterCard from "./CharacterCard";
import { Character } from "../models/Character.model";
import { GET_CHARACTERS_FILTER } from "../graphql/queries/getCharactersFilter";

interface CharacterListProps {
  query: string;
  sortOrder: string;
  onCharacterSelect: (character: Character) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  query,
  sortOrder,
  onCharacterSelect,
}) => {
  const { loading, error, data } = useQuery(GET_CHARACTERS_FILTER, {
    variables: { filter: { name: query } },
  });

  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null
  );
  const [favoriteCharacters, setFavoriteCharacters] = useState<string[]>([]);
  const [sortedCharacters, setSortedCharacters] = useState<Character[]>([]);

  useEffect(() => {
    if (data) {
      const characters = [...data.characters.results];
      if (sortOrder === "asc") {
        characters.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        characters.sort((a, b) => b.name.localeCompare(a.name));
      }
      setSortedCharacters(characters);
    }
  }, [data, sortOrder]);

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

  const starredCharacters = sortedCharacters.filter((character: Character) =>
    favoriteCharacters.includes(character.id)
  );
  const regularCharacters = sortedCharacters.filter(
    (character: Character) => !favoriteCharacters.includes(character.id)
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Starred Characters</h3>
      {starredCharacters.map((character: Character, index: number) => (
        <CharacterCard
          key={character.id}
          character={{
            ...character,
            isFavorite: favoriteCharacters.includes(character.id),
          }}
          onClick={() => handleCharacterClick(character)}
          isSelected={character.id === selectedCharacterId}
          onToggleFavorite={() => handleToggleFavorite(character.id)}
          isLastItem={index === starredCharacters.length - 1}
        />
      ))}
      <h3 className="text-lg font-semibold mb-2">Characters</h3>
      {regularCharacters.map((character: Character, index: number) => (
        <CharacterCard
          key={character.id}
          character={{
            ...character,
            isFavorite: favoriteCharacters.includes(character.id),
          }}
          onClick={() => handleCharacterClick(character)}
          isSelected={character.id === selectedCharacterId}
          onToggleFavorite={() => handleToggleFavorite(character.id)}
          isLastItem={index === regularCharacters.length - 1}
        />
      ))}
    </div>
  );
};

export default CharacterList;
