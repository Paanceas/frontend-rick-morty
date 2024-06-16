import { gql } from '@apollo/client';

export const GET_CHARACTERS_FILTER = gql`
  query GetCharacters($filter: FilterCharacter) {
    characters(filter: $filter) {
      results {
        id
        name
        image
        species
      }
    }
  }
`;
