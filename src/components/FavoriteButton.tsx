import React from "react";
import { useMutation } from "@apollo/client";
import { Character } from "../models/Character.model";
import { ADD_FAVORITE_CHARACTER } from "../graphql/mutations/addFavoriteCharacter";
import { DELETE_FAVORITE_CHARACTER } from "../graphql/mutations/delFavoriteCharacter";

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
  const [addFavoriteCharacter] = useMutation(ADD_FAVORITE_CHARACTER);
  const [deleteFavoriteCharacter] = useMutation(DELETE_FAVORITE_CHARACTER);

  const handleToggleFavorite = async () => {
    try {
      if (character.isFavorite) {
        await deleteFavoriteCharacter({
          variables: { id: character.id },
        });
        onToggleFavoriteState({ ...character, isFavorite: false }, false);
      } else {
        await addFavoriteCharacter({
          variables: {
            name: character.name,
            status: character.status,
            species: character.species,
            gender: character.gender,
            origin: character.origin.name,
          },
        });
        onToggleFavoriteState({ ...character, isFavorite: true }, true);
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
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
