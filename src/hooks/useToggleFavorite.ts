import { useMutation } from "@apollo/client";
import { Character } from "../models/Character.model";
import { ADD_FAVORITE_CHARACTER } from "../graphql/mutations/addFavoriteCharacter";
import { DELETE_FAVORITE_CHARACTER } from "../graphql/mutations/delFavoriteCharacter";
import { useCallback } from "react";

export const useToggleFavorite = (onToggleFavoriteState: (updatedCharacter: Character, isFavorite: boolean) => void) => {
    const [addFavoriteCharacter] = useMutation(ADD_FAVORITE_CHARACTER);
    const [deleteFavoriteCharacter] = useMutation(DELETE_FAVORITE_CHARACTER);

    const toggleFavorite = useCallback(async (character: Character) => {
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
    }, [addFavoriteCharacter, deleteFavoriteCharacter, onToggleFavoriteState]);

    return { toggleFavorite };
};
