import { useState, useCallback } from "react";

export const useComments = () => {
    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState<string>("");

    const addComment = useCallback(() => {
        setComments((prevComments) => [...prevComments, newComment]);
        setNewComment("");
    }, [newComment]);

    return {
        comments,
        newComment,
        setNewComment,
        addComment,
    };
};
