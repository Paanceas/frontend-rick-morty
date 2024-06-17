import { gql } from '@apollo/client';

export const GET_FAVORITES_CHARACTERS = gql`
    query { 
        favoritesCharacters {
            id,
            name,
            status,
            species,
            gender,
            image,
            origin,
            createdAt,
            updatedAt,
        }
    }
`;
