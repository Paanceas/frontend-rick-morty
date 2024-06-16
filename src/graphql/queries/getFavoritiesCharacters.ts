import { gql } from '@apollo/client';

export const GET_FAVORITES_CHARACTERS = gql`
    query { 
        favoritesCharacters {
            id,
            name,
            status,
            species,
            gender,
            origin,
            createdAt,
            updatedAt,
        }
    }
`;
