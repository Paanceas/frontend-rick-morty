import React, { useState } from "react";
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
    variables: { filter: { name: query }, orderBy: { name: sortOrder } },
  });
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null
  );
  const [favoriteCharacters, setFavoriteCharacters] = useState<string[]>([]);

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

  const allCharacters = data.characters.results;
  const starredCharacters = allCharacters.filter((character: Character) =>
    favoriteCharacters.includes(character.id)
  );
  const regularCharacters = allCharacters.filter(
    (character: Character) => !favoriteCharacters.includes(character.id)
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Starred Characters</h3>
      <div className="space-y-2">
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
      </div>
      <h3 className="text-lg font-semibold my-4">Characters</h3>
      <div className="space-y-2">
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
    </div>
  );
};

export default CharacterList;
