import { gql } from "@apollo/client";


export const ADD_FAVORITE_CHARACTER = gql`
    mutation AddFavoritesCharacters($name: String!
        $status: String!
        $species: String!
        $gender: String!
        $origin: String!) 
    {  
        addFavoriteCharacter(input: {name: $name, status: $status, species: $species,gender: $gender,origin: $origin}) 
        { 
            id,
            name,
            status,
            species,
            gender,
            origin,
            createdAt,
            updatedAt,
        } 
    }`;

