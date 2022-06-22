import { CommentTypes } from "./comment.types";

export const editCommentStart = (commentId, content) => ({
    type: CommentTypes.EDIT_COMMENT_START,
    payload: {
        commentId,
        content
    }
});

export const editCommentSuccess = (result) => ({
    type: CommentTypes.EDIT_COMMENT_SUCCESS,
    payload: result
});

export const deleteCommentStart = (commentId) => ({
    type: CommentTypes.DELETE_COMMENT_START,
    payload: commentId
});

export const deleteCommentSuccess = (result) => ({
    type: CommentTypes.DELETE_COMMENT_SUCCESS,
    payload: result
});

export const editReplyCommentStart = (replyId, content) => ({
    type: CommentTypes.EDIT_REPLY_COMMENT_START,
    payload: {
        replyId,
        content
    }
});

export const editReplyCommentSuccess = (result) => ({
    type: CommentTypes.EDIT_REPLY_COMMENT_SUCCESS,
    payload: result
});

export const deleteReplyCommentStart = (replyId) => ({
    type: CommentTypes.DELETE_REPLY_COMMENT_START,
    payload: replyId
});

export const deleteReplyCommentSuccess = (result) => ({
    type: CommentTypes.DELETE_REPLY_COMMENT_SUCCESS,
    payload: result
});

export const fetchFailure = (error) => ({
    type: CommentTypes.FETCH_FAILURE,
    payload: error
})