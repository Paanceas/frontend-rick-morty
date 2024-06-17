import React from "react";

interface CommentsListProps {
  comments: string[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  return (
    <ul className="list-disc pl-5">
      {comments.map((comment, index) => (
        <li key={index} className="mb-1">
          {comment}
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
