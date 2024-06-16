import React, { useState } from "react";

interface CommentsSectionProps {
  characterId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ characterId }) => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  const handleAddComment = () => {
    setComments([...comments, newComment]);
    setNewComment("");
  };

  return (
    <div className="mt-4 w-full">
      <h3 className="text-lg font-bold mb-2">
        Comments for Character ID: {characterId}
      </h3>
      <ul className="list-disc pl-5">
        {comments.map((comment, index) => (
          <li key={index} className="mb-1">
            {comment}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
        className="border border-gray-300 rounded px-3 py-2 w-full mt-2"
      />
      <button
        onClick={handleAddComment}
        className="bg-blue-500 text-white rounded px-3 py-2 mt-2">
        Add Comment
      </button>
    </div>
  );
};

export default CommentsSection;
