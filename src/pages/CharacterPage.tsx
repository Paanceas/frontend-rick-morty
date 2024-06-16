import React from "react";
import { useParams } from "react-router-dom";
import CharacterDetail from "../components/CharacterDetail";

const CharacterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="container mx-auto p-4">
      <CharacterDetail id={id!} />
    </div>
  );
};

export default CharacterPage;
