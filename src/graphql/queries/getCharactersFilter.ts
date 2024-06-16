import { gql } from '@apollo/client';

export const GET_CHARACTERS_FILTER = gql`
  query GetCharacters($status: String,$species: String,$gender: String,$name: String){ 
    characters(status: $status, species:$species, gender: $gender, name: $name) {
      id
      name
      status
      species
      gender
      origin {
        name
      }
    }
}
`;
