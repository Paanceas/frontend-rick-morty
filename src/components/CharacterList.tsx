import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@apollo/client";
import CharacterCard from "./CharacterCard";
import { Character } from "../models/Character.model";
import { GET_CHARACTERS_FILTER } from "../graphql/queries/getCharactersFilter";
import { GET_FAVORITES_CHARACTERS } from "../graphql/queries/getFavoritiesCharacters";

interface CharacterListProps {
  query: string;
  sortOrder: string;
  filters: { gender: string; species: string };
  eventFavorites: { character: Character; isFavorite: boolean } | null;
  onCharacterSelect: (character: Character) => void;
  onFilteredCountChange: (count: number) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  query,
  sortOrder,
  filters,
  eventFavorites,
  onCharacterSelect,
  onFilteredCountChange,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [localEventFavorites, setLocalEventFavorites] =
    useState(eventFavorites);

  const variables = useMemo(
    () => ({
      name: query,
      gender: filters.gender === "all" ? "" : filters.gender,
      species: filters.species === "all" ? "" : filters.species,
    }),
    [query, filters]
  );

  const {
    loading: loadingFavorites,
    error: errorFavorites,
    data: dataFavorites,
  } = useQuery(GET_FAVORITES_CHARACTERS);
  const {
    loading: loadingCharacters,
    error: errorCharacters,
    data: dataCharacters,
    refetch: refetchCharacters,
  } = useQuery(GET_CHARACTERS_FILTER, { variables, skip: !dataFavorites });

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
    if (dataCharacters?.characters && dataFavorites?.favoritesCharacters) {
      const favoritesNames = new Set(
        dataFavorites.favoritesCharacters.map((char: Character) => char.name)
      );
      setFilteredCharacters(
        dataCharacters.characters.filter(
          (character: Character) => !favoritesNames.has(character.name)
        )
      );
    }
  }, [dataCharacters, dataFavorites]);

  useEffect(() => {
    onFilteredCountChange(
      filteredCharacters.length + favoriteCharacters.length
    );
  }, [
    filteredCharacters.length,
    favoriteCharacters.length,
    onFilteredCountChange,
  ]);

  const handleCharacterClick = useCallback(
    (character: Character) => {
      setSelectedCharacter(character);
      onCharacterSelect(character);
    },
    [onCharacterSelect]
  );

  const handleToggleFavorite = useCallback(
    async (character: Character, isFavorite: boolean) => {
      setFavoriteCharacters((prev) => {
        if (isFavorite) {
          if (
            !prev.some((favCharacter) => favCharacter.name === character.name)
          ) {
            return [...prev, { ...character, isFavorite: true }];
          }
          return prev;
        }
        return prev.filter(
          (favCharacter) => favCharacter.name !== character.name
        );
      });

      if (selectedCharacter?.name === character.name) {
        handleCharacterClick({ ...character, isFavorite });
      }

      setFilteredCharacters((prev) => {
        if (!isFavorite) {
          if (
            !prev.some(
              (filteredCharacter) => filteredCharacter.name === character.name
            )
          ) {
            return [...prev, { ...character, isFavorite: false }];
          }
          return prev;
        }
        return prev.filter(
          (filteredCharacter) => filteredCharacter.name !== character.name
        );
      });

      await refetchCharacters();
    },
    [selectedCharacter, handleCharacterClick, refetchCharacters]
  );

  useEffect(() => {
    if (
      localEventFavorites?.character &&
      localEventFavorites?.isFavorite !== undefined
    ) {
      const { character, isFavorite } = localEventFavorites;
      console.log("🚀 ~ useEffect ~ eventFavorites:", localEventFavorites);
      handleToggleFavorite(character, isFavorite);
      setLocalEventFavorites(null); // Actualiza el estado interno
    }
  }, [localEventFavorites, handleToggleFavorite]);

  useEffect(() => {
    setLocalEventFavorites(eventFavorites);
  }, [eventFavorites]);

  const sortedFavoriteCharacters = useMemo(() => {
    return [...favoriteCharacters].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }, [favoriteCharacters, sortOrder]);

  const sortedFilteredCharacters = useMemo(() => {
    return [...filteredCharacters].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }, [filteredCharacters, sortOrder]);

  if (loadingFavorites || loadingCharacters) return <p>Loading...</p>;
  if (errorFavorites) return <p>Error: {errorFavorites.message}</p>;
  if (errorCharacters) return <p>Error: {errorCharacters.message}</p>;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Starred Characters</h3>
      {sortedFavoriteCharacters.map((character: Character, index: number) => (
        <CharacterCard
          key={`favorite-${character.id}-${index}`}
          character={character}
          onClick={() => handleCharacterClick(character)}
          isSelected={selectedCharacter?.name === character.name}
          onToggleFavoriteState={handleToggleFavorite}
          isLastItem={index === sortedFavoriteCharacters.length - 1}
        />
      ))}
      <h3 className="text-lg font-semibold mb-2">Characters</h3>
      {sortedFilteredCharacters.map((character: Character, index: number) => (
        <CharacterCard
          key={`filtered-${character.id}-${index}`}
          character={character}
          onClick={() => handleCharacterClick(character)}
          isSelected={selectedCharacter?.name === character.name}
          onToggleFavoriteState={handleToggleFavorite}
          isLastItem={index === sortedFilteredCharacters.length - 1}
        />
      ))}
    </div>
  );
};

export default CharacterList;
