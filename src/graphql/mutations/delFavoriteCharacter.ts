import { gql } from "@apollo/client";


export const DELETE_FAVORITE_CHARACTER = gql`
    mutation DeleteFavoriteCharacter($id: ID!) 
    {  deleteFavoriteCharacter(id: $id) 
        { 
            id,
    
        } 
    }
`;