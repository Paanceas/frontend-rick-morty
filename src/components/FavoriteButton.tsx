import React from "react";
import { Character } from "../models/Character.model";
import { useToggleFavorite } from "../hooks/useToggleFavorite";

interface FavoriteButtonProps {
  character: Character;
  position: "absolute" | "relative";
  containerStyle?: string;
  iconStyle?: string;
  onToggleFavoriteState: (
    updatedCharacter: Character,
    isFavorite: boolean
  ) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  character,
  position,
  containerStyle = "",
  iconStyle = "",
  onToggleFavoriteState,
}) => {
  const { toggleFavorite } = useToggleFavorite(onToggleFavoriteState);

  const handleToggleFavorite = () => {
    toggleFavorite(character);
  };

  return (
    <div
      onClick={handleToggleFavorite}
      className={`cursor-pointer ${position} ${containerStyle}`}>
      <i
        className={`fas fa-heart ${
          character.isFavorite ? "text-green-500" : "text-gray-300"
        } ${iconStyle}`}></i>
    </div>
  );
};

export default FavoriteButton;
