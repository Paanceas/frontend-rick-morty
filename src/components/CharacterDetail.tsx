import React from "react";
import { Character } from "../models/Character.model";

interface CharacterDetailProps {
  character: Character;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ character }) => {
  const handleToggleFavorite = (characterId: string) => {
    console.log("🚀 ~ handleToggleFavorite ~ characterId:", characterId);
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
    </div>
  );
};

export default CharacterDetail;
