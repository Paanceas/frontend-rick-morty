import React, { useState, useEffect } from "react";
import { Character } from "../models/Character.model";
import FavoriteButton from "./FavoriteButton";
import { useGetComments } from "../hooks/useGetComments";
import { useAddComment } from "../hooks/useAddComment";

interface CharacterDetailProps {
  character: Character;
  onToggleFavoriteState: (character: Character, isFavorite: boolean) => void;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({
  character,
  onToggleFavoriteState,
}) => {
  const [currentCharacter, setCurrentCharacter] =
    useState<Character>(character);

  const {
    loading,
    error,
    comments: fetchedComments,
  } = useGetComments(currentCharacter.id);
  const { newComment, setNewComment, addComment, isCommentEmpty } =
    useAddComment(currentCharacter.id);

  useEffect(() => {
    setCurrentCharacter(character);
  }, [character]);

  const handleToggleFavoriteState = (
    updatedCharacter: Character,
    isFavorite: boolean
  ) => {
    const updatedChar = { ...updatedCharacter, isFavorite };
    setCurrentCharacter(updatedChar);
    onToggleFavoriteState(updatedChar, isFavorite);
  };

  return (
    <div className="p-[10%] flex flex-col items-center lg:items-start rounded-lg h-full shadow-left-only">
      <div className="relative mb-4">
        <img
          src={
            currentCharacter.image ||
            "https://rickandmortyapi.com/api/character/avatar/361.jpeg"
          }
          alt={currentCharacter.name}
          className="w-24 h-24 rounded-full"
        />
        <FavoriteButton
          character={currentCharacter}
          position="absolute"
          containerStyle="bottom-0 right-0 bg-white rounded-full p-1"
          onToggleFavoriteState={handleToggleFavoriteState}
        />
      </div>
      <h2 className="text-xl font-semibold text-center lg:text-left mb-4">
        {currentCharacter.name}
      </h2>
      <ul className="w-full mt-4 px-4 lg:px-0">
        <li className="flex flex-col py-2 border-b">
          <span className="text-gray-600">Specie</span>
          <span className="text-gray-900">{currentCharacter.species}</span>
        </li>
        <li className="flex flex-col py-2 border-b">
          <span className="text-gray-600">Status</span>
          <span className="text-gray-900">{currentCharacter.status}</span>
        </li>
        <li className="flex flex-col py-2 border-b">
          <span className="text-gray-600">Gender</span>
          <span className="text-gray-900">{currentCharacter.gender}</span>
        </li>
        <li className="flex flex-col py-2">
          <span className="text-gray-600">Origin</span>
          <span className="text-gray-900">{currentCharacter.origin.name}</span>
        </li>
      </ul>
      {loading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p>Error loading comments: {error.message}</p>
      ) : (
        <div className="w-full mt-4">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <ul className="space-y-2 mb-4">
            {fetchedComments.map((comment) => (
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
              onClick={addComment}
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
