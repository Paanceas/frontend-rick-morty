import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../graphql/queries/getComments";
import { Comment } from "../models/Comment.model";

export const useGetComments = (characterId: string) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const { loading, error, data } = useQuery(GET_COMMENTS, {
        variables: { characterId },
    });

    useEffect(() => {
        if (data) {
            setComments(data.comments);
        }
    }, [data]);

    return {
        loading,
        error,
        comments,
    };
};
