import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
mutation AddComments($characterId: ID!, $content: String!) {
  addComment(characterId: $characterId, content: $content) {
    id
    content
    characterId
  }
}
`;