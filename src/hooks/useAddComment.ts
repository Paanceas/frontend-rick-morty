import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../graphql/mutations/addComment";
import { GET_COMMENTS } from "../graphql/queries/getComments";

export const useAddComment = (characterId: string) => {
    const [newComment, setNewComment] = useState<string>("");
    const [isCommentEmpty, setIsCommentEmpty] = useState<boolean>(false);
    const [addCommentMutation] = useMutation(ADD_COMMENT, {
        refetchQueries: [{ query: GET_COMMENTS, variables: { characterId } }],
    });

    const addComment = useCallback(() => {
        if (newComment.trim() === "") {
            setIsCommentEmpty(true);
            return;
        }
        addCommentMutation({
            variables: { characterId, content: newComment },
        });
        setNewComment("");
        setIsCommentEmpty(false);
    }, [newComment, characterId, addCommentMutation]);

    return {
        newComment,
        setNewComment,
        addComment,
        isCommentEmpty,
    };
};
