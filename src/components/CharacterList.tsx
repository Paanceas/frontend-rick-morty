import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import CharacterCard from "./CharacterCard";
import { Character } from "../models/Character.model";
import { GET_CHARACTERS_FILTER } from "../graphql/queries/getCharactersFilter";
import { GET_FAVORITES_CHARACTERS } from "../graphql/queries/getFavoritiesCharacters";

interface CharacterListProps {
  query: string;
  sortOrder: string;
  filters: { gender: string; species: string };
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
  const [variables, setVariables] = useState({
    name: query,
    gender: filters.gender === "all" ? "" : filters.gender,
    species: filters.species === "all" ? "" : filters.species,
  });

  useEffect(() => {
    setVariables({
      name: query,
      gender: filters.gender === "all" ? "" : filters.gender,
      species: filters.species === "all" ? "" : filters.species,
    });
  }, [query, filters]);

  const {
    loading: loadingFavorites,
    error: errorFavorites,
    data: dataFavorites,
  } = useQuery(GET_FAVORITES_CHARACTERS);

  const {
    loading: loadingCharacters,
    error: errorCharacters,
    data: dataCharacters,
  } = useQuery(GET_CHARACTERS_FILTER, {
    variables,
  });

  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null
  );
  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

  useEffect(() => {
    if (dataFavorites?.favoritesCharacters) {
      setFavoriteCharacters(
        dataFavorites.favoritesCharacters.map((character: Character) => ({
          ...character,
          isFavorite: true,
        }))
      );
    }
  }, [dataFavorites]);

  useEffect(() => {
    if (dataCharacters && dataCharacters.characters) {
      const filtered = dataCharacters.characters.filter(
        (character: Character) =>
          !favoriteCharacters.some(
            (favCharacter) => favCharacter.id === character.id
          )
      );
      setFilteredCharacters(filtered);
      onFilteredCountChange(filtered.length + favoriteCharacters.length);
    }
  }, [dataCharacters, favoriteCharacters, onFilteredCountChange]);

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacterId(character.id);
    onCharacterSelect(character);
  };

  const handleToggleFavorite = (character: Character) => {
    setFavoriteCharacters((prev) => {
      return prev.some((favCharacter) => favCharacter.id === character.id)
        ? prev.filter((favCharacter) => favCharacter.id !== character.id)
        : [...prev, character];
    });
  };

  if (loadingCharacters || loadingFavorites) return <p>Loading...</p>;
  if (errorCharacters) return <p>Error: {errorCharacters.message}</p>;
  if (errorFavorites) return <p>Error: {errorFavorites.message}</p>;

  const sortedFavoriteCharacters = [...favoriteCharacters].sort((a, b) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  const sortedFilteredCharacters = [...filteredCharacters].sort((a, b) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Starred Characters</h3>
      {sortedFavoriteCharacters.map((character: Character, index: number) => (
        <CharacterCard
          key={character.id}
          character={character}
          onClick={() => handleCharacterClick(character)}
          isSelected={character.id === selectedCharacterId}
          onToggleFavorite={() => handleToggleFavorite(character)}
          isLastItem={index === sortedFavoriteCharacters.length - 1}
        />
      ))}
      <h3 className="text-lg font-semibold mb-2">Characters</h3>
      {sortedFilteredCharacters.map((character: Character, index: number) => (
        <CharacterCard
          key={character.id}
          character={character}
          onClick={() => handleCharacterClick(character)}
          isSelected={character.id === selectedCharacterId}
          onToggleFavorite={() => handleToggleFavorite(character)}
          isLastItem={index === sortedFilteredCharacters.length - 1}
        />
      ))}
    </div>
  );
};

export default CharacterList;
