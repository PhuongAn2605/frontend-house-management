import HouseTypes from "./house.types";

export const fetchAllHouseStart = () => ({
    type: HouseTypes.FETCH_ALL_HOUSE_START
});

export const fetchAllHouseSuccess = (result) => ({
    type: HouseTypes.FETCH_ALL_HOUSE_SUCCESS,
    payload: result
});

export const getHouseByIdStart = (id) => ({
    type: HouseTypes.GET_HOUSE_BY_ID_START,
    payload: id
});

export const getHouseByIdSuccess = (result) => ({
    type: HouseTypes.GET_HOUSE_BY_ID_SUCCESS,
    payload: result
});

export const fetchFailure = (error) => ({
    type: HouseTypes.FETCH_FAILURE,
    payload: error
});

export const sendCommentStart = (visitHouseId, comment, commenter) => ({
    type: HouseTypes.SEND_COMMENT_START,
    payload: {
        visitHouseId,
        comment,
        commenter
    }
});

export const sendCommentSuccess = (result) => ({
    type: HouseTypes.SEND_COMMENT_SUCCESS,
    payload: result
});

export const sendReplyCommentStart = (commentId, content, commenter) => ({
    type: HouseTypes.SEND_REPLY_COMMENT_START,
    payload: {
        commentId,
        content,
        commenter
    }
});

export const sendReplyCommentSuccess = (result) => ({
    type: HouseTypes.SEND_REPLY_COMMENT_SUCCESS,
    payload: result
});

export const getCommentsByHouseIdStart = (houseId) => ({
    type: HouseTypes.GET_COMMENTS_BY_HOUSE_ID_START,
    payload: houseId
});

export const getCommentsByHouseIdSuccess = (result) => ({
    type: HouseTypes.GET_COMMENTS_BY_HOUSE_ID_SUCCESS,
    payload: result
});

export const getRepliesByCommentIdStart = (commentId) => ({
    type: HouseTypes.GET_REPLIES_BY_COMMENT_ID_START,
    payload: commentId
});

export const getRepliesByCommentIdSuccess = (result) => ({
    type: HouseTypes.GET_REPLIES_BY_COMMENT_ID_SUCCESS,
    payload: result
});

export const likeCommentStart = (commentId, like, userName) => ({
    type: HouseTypes.LIKE_COMMENT_START,
    payload: {
        commentId,
        like,
        userName
    }
});

export const likeCommentSuccess = (result) => ({
    type: HouseTypes.LIKE_COMMENT_SUCCESS,
    payload: result
});

export const likeHouseStart = (like, houseId, userName) => ({
    type: HouseTypes.LIKE_HOUSE_START,
    payload: {
        like,
        houseId,
        userName
    }
});

export const likeHouseSuccess = (result) => ({
    type: HouseTypes.LIKE_HOUSE_SUCCESS,
    payload: result
});

export const setHouseLikes = (houseLikes) => ({
    type: HouseTypes.SET_HOUSE_LIKES_FROM_AUTH,
    payload: houseLikes
});

export const setHouseComments = (authComments) => ({
    type: HouseTypes.SET_HOUSE_COMMENTS_FROM_AUTH,
    payload: authComments
});

export const setSearchedHouses = (searchedHouses) => ({
    type: HouseTypes.SET_SEARCH_HOUSE,
    payload: searchedHouses
});

