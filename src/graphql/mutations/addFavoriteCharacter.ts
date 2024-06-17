import { gql } from "@apollo/client";


export const ADD_FAVORITE_CHARACTER = gql`
    mutation AddFavoritesCharacters($name: String!
    $status: String!
    $species: String!
    $gender: String!
    $origin: String!
    $characterId: ID!
    $image: String!
) 
{  
    addFavoriteCharacter(input: {characterId: $characterId,name: $name, status: $status, species: $species,gender: $gender,origin: $origin, image:$image}) 
    { 
        id,
        characterId,
        name,
        status,
        species,
        gender,
        image,
        origin,
        createdAt,
        updatedAt,
    } 
}`;

