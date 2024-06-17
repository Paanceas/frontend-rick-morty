import React, { useState, useEffect } from "react";
import { Character } from "../models/Character.model";
import FavoriteButton from "./FavoriteButton";

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
  isSelected: boolean;
  onToggleFavoriteState: (
    updatedCharacter: Character,
    isFavorite: boolean
  ) => void;
  isLastItem: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onClick,
  isSelected,
  onToggleFavoriteState,
  isLastItem,
}) => {
  const [currentCharacter, setCurrentCharacter] =
    useState<Character>(character);

  useEffect(() => {
    setCurrentCharacter(character);
  }, [character]);

  const handleToggleFavoriteState = (
    updatedCharacter: Character,
    isFavorite: boolean
  ) => {
    setCurrentCharacter(updatedCharacter);
    onToggleFavoriteState(updatedCharacter, isFavorite);
  };

  return (
    <div
      className={`flex items-center p-4 cursor-pointer ${
        isSelected ? "bg-primary100" : "bg-white"
      } ${
        isLastItem ? "" : "border-b"
      } first:border-t last:border-b-0 rounded-lg`}
      onClick={onClick}>
      <img
        src={
          currentCharacter.image ||
          "https://rickandmortyapi.com/api/character/avatar/361.jpeg"
        }
        alt={currentCharacter.name}
        className="w-12 h-12 rounded-full"
      />
      <div className="ml-4 flex-grow">
        <h2
          className={`text-lg font-medium ${
            isSelected ? "text-primary700" : "text-gray-900"
          }`}>
          {currentCharacter.name}
        </h2>
        <p className="text-gray-600">{currentCharacter.species}</p>
      </div>
      <FavoriteButton
        character={currentCharacter}
        position="relative"
        containerStyle="ml-auto"
        onToggleFavoriteState={handleToggleFavoriteState}
      />
    </div>
  );
};

export default CharacterCard;
