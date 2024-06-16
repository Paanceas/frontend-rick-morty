import React from "react";
import { Character } from "../models/Character.model";

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
  isSelected: boolean;
  onToggleFavorite: () => void;
  isLastItem: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onClick,
  isSelected,
  onToggleFavorite,
  isLastItem,
}) => {
  return (
    <div
      className={`flex items-center p-4 cursor-pointer ${
        isSelected ? "bg-primary100" : "bg-white"
      } ${
        isLastItem ? "" : "border-b"
      } first:border-t last:border-b-0 rounded-lg`}
      onClick={onClick}>
      <img
        src={character.image}
        alt={character.name}
        className="w-12 h-12 rounded-full"
      />
      <div className="ml-4 flex-grow">
        <h2
          className={`text-lg font-medium ${
            isSelected ? "text-primary700" : "text-gray-900"
          }`}>
          {character.name}
        </h2>
        <p className="text-gray-600">{character.species}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        className="ml-auto focus:outline-none">
        <i
          className={`fas fa-heart ${
            character.isFavorite ? "text-green-500" : "text-gray-300"
          }`}></i>
      </button>
    </div>
  );
};

export default CharacterCard;
