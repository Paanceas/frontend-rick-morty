import React, { useState } from "react";
import { Character } from "../models/Character.model";
import { GET_COMMENTS } from "../graphql/queries/getComments";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Comment } from "../models/Comment.model";

interface CharacterDetailProps {
  character: Character;
}

const ADD_COMMENT = gql`
  mutation AddComments($characterId: ID!, $content: String!) {
    addComment(characterId: $characterId, content: $content) {
      id
      content
      characterId
    }
  }
`;

const CharacterDetail: React.FC<CharacterDetailProps> = ({ character }) => {
  const {
    loading: loadingComments,
    error: errorComments,
    data: dataComments,
  } = useQuery(GET_COMMENTS, {
    variables: { characterId: character.id },
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [
      { query: GET_COMMENTS, variables: { characterId: character.id } },
    ],
  });

  const [newComment, setNewComment] = useState<string>("");
  const [isCommentEmpty, setIsCommentEmpty] = useState<boolean>(false);

  const handleToggleFavorite = (characterId: string) => {
    console.log("🚀 ~ handleToggleFavorite ~ characterId:", characterId);
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      setIsCommentEmpty(true);
      return;
    }
    addComment({
      variables: { characterId: character.id, content: newComment },
    });
    setNewComment("");
    setIsCommentEmpty(false);
  };

  return (
    <div className="p-[10%] flex flex-col items-center lg:items-start rounded-lg h-full shadow-left-only">
      <div className="relative mb-4">
        <img
          src={
            character.image ||
            "https://rickandmortyapi.com/api/character/avatar/361.jpeg"
          }
          alt={character.name}
          className="w-24 h-24 rounded-full"
        />
        <div
          onClick={() => handleToggleFavorite(character.id)}
          className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer">
          <i
            className={`fas fa-heart ${
              character.isFavorite ? "text-green-500" : "text-gray-300"
            }`}></i>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-center lg:text-left mb-4">
        {character.name}
      </h2>
      <ul className="w-full mt-4 px-4 lg:px-0">
        <li className="flex flex-col py-2 border-b">
          <span className="text-gray-600">Specie</span>
          <span className="text-gray-900">{character.species}</span>
        </li>
        <li className="flex flex-col py-2 border-b">
          <span className="text-gray-600">Status</span>
          <span className="text-gray-900">{character.status}</span>
        </li>
        <li className="flex flex-col py-2 border-b">
          <span className="text-gray-600">Occupation</span>
          <span className="text-gray-900">{character.gender}</span>
        </li>
        <li className="flex flex-col py-2">
          <span className="text-gray-600">Origin</span>
          <span className="text-gray-900">{character.origin.name}</span>
        </li>
      </ul>
      {loadingComments ? (
        <p>Loading comments...</p>
      ) : errorComments ? (
        <p>Error loading comments: {errorComments.message}</p>
      ) : (
        <div className="w-full mt-4">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <ul className="space-y-2 mb-4">
            {dataComments.comments.map((comment: Comment) => (
              <li
                key={comment.id}
                className="bg-gray-100 p-2 rounded-lg shadow-md">
                {comment.content}
              </li>
            ))}
          </ul>
          <div className="flex items-center">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
              className={`border rounded-lg px-3 py-2 w-full mb-2 mr-2 focus:outline-none ${
                isCommentEmpty ? "border-red-500" : "border-gray-300"
              } focus:border-primary500`}
            />
            <button
              onClick={handleAddComment}
              className="bg-purple-700 text-purple-100 rounded-full p-3 flex items-center justify-center mb-2 hover:bg-purple-100 hover:text-purple-700 focus:outline-none">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
          {isCommentEmpty && (
            <p className="text-red-500 text-sm">Comment cannot be empty</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterDetail;
