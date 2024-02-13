import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COMMENTS } from '../utils/queries';
import { DELETE_COMMENT } from '../utils/mutations'; 
import Button from '@mui/material/Button';

const Comments = ({ postId }) => {
    const { loading, error, data, refetch } = useQuery(GET_COMMENTS, {
        variables: { postId },
    });

    const [deleteCommentMutation] = useMutation(DELETE_COMMENT);

    if (loading) {
        return <p>Loading comments...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const comments = data?.comments;

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteCommentMutation({
                variables: { deleteCommentId: commentId },
            });
            refetch();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleUpdateComment = (commentId) => {
        console.log("Update comment with id:", commentId);
    };

    return (
        <div>
            <h4>Comments</h4>
            {comments.map(comment => (
                <div key={comment.id}>
                    <p>Content: {comment.content}</p>
                    <p>By: {comment.author.username}</p>
                    <p>Created At: {comment.updatedAt ? `Updated At: ${new Date(parseInt(comment.updatedAt)).toLocaleDateString()}` : `Created At: ${new Date(parseInt(comment.createdAt)).toLocaleDateString()}`}</p>
                    <Button onClick={() => handleUpdateComment(comment.id)} variant="contained" color="primary">Update</Button>
                    <Button onClick={() => handleDeleteComment(comment.id)} variant="contained" color="secondary">Delete</Button>
                </div>
            ))}
        </div>
    );
};

export default Comments;
