import React from "react";
import { useComments } from "../hooks/useComments";
import CommentsList from "./CommentsList";

interface CommentsSectionProps {
  characterId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ characterId }) => {
  const { comments, newComment, setNewComment, addComment } = useComments();

  return (
    <div className="mt-4 w-full">
      <h3 className="text-lg font-bold mb-2">
        Comments for Character ID: {characterId}
      </h3>
      <CommentsList comments={comments} />
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
        className="border border-gray-300 rounded px-3 py-2 w-full mt-2"
      />
      <button
        onClick={addComment}
        className="bg-blue-500 text-white rounded px-3 py-2 mt-2">
        Add Comment
      </button>
    </div>
  );
};

export default CommentsSection;
