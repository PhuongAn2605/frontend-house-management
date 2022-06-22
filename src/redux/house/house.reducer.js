import { CommentTypes } from "../comment/comment.types";
import HouseTypes from "./house.types";
import { deleteComment, editComment } from "./house.utils";

const INITIAL_STATE = {
  houses: [],
  visitHouse: null,
  targetProducts: [],
  targetComments: [],
  commentDetails: [],
  commentLikes: [],
  houseLikes: [],
  replyComments: [],
  message: null,
  currentComment: null,
  error: null,
  searchedHouses: [],
  isSearch: false
};

const houseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HouseTypes.FETCH_ALL_HOUSE_START:
      return {
        ...state,
        error: null
      }
    case HouseTypes.FETCH_ALL_HOUSE_SUCCESS:
      return {
        ...state,
        houses: action.payload,
        searchedHouses: [],
        isSearch: false,
        error: null,
      };
    case HouseTypes.GET_HOUSE_BY_ID_START:
      return {
        ...state,
        error: null
      }
    case HouseTypes.GET_HOUSE_BY_ID_SUCCESS:
      localStorage.setItem(
        "visitHouse",
        JSON.stringify({
          visitHouse: action.payload.house,
          targetProducts: action.payload.targetProducts,
          targetComments: action.payload.targetComments,
          houseLikes: action.payload.houseLikes,
        })
      );

      return {
        ...state,
        visitHouse: action.payload.house,
        targetProducts: action.payload.targetProducts,
        targetComments: action.payload.targetComments,
        houseLikes: action.payload.houseLikes,
        error: null,
      };
    case HouseTypes.SEND_COMMENT_START:
      return {
        ...state,
        error: null
      }
    case HouseTypes.SEND_COMMENT_SUCCESS:
      return {
        ...state,
        targetComments: action.payload.comments,
        error: null,
      };
    case HouseTypes.SEND_REPLY_COMMENT_START:
      return {
        ...state,
        error: null
      }
    case HouseTypes.SEND_REPLY_COMMENT_SUCCESS:
      return {
        ...state,
        replyComments: action.payload.replyComments,
        erorr: null,
      };
    case HouseTypes.GET_COMMENTS_BY_HOUSE_ID_START:
      return {
        ...state,
        error: null
      }
    case HouseTypes.GET_COMMENTS_BY_HOUSE_ID_SUCCESS:
      return {
        ...state,
        targetComments: action.payload.comments,
        error: null,
      };
    case HouseTypes.GET_REPLIES_BY_COMMENT_ID_START:
      return {
        ...state,
        error: null
      }
    case HouseTypes.GET_REPLIES_BY_COMMENT_ID_SUCCESS:
      return {
        ...state,
        replyComments: action.payload.replyComments,
        error: null,
      };
    case HouseTypes.LIKE_COMMENT_START:
      return {
        ...state,
        error: null
      }
    case HouseTypes.LIKE_COMMENT_SUCCESS:
      return {
        ...state,
        commentLikes: action.payload.commentLikes,
        error: null,
      };
    case HouseTypes.LIKE_HOUSE_START:
      return {
        ...state,
        error: null
      }
    case HouseTypes.LIKE_HOUSE_SUCCESS:
      return {
        ...state,
        houseLikes: action.payload.houseLikes,
        error: null,
      };
    case HouseTypes.SET_HOUSE_LIKES_FROM_AUTH:
      return {
        ...state,
        houseLikes: action.payload,
      };

    case HouseTypes.SET_HOUSE_COMMENTS_FROM_AUTH:
      return {
        ...state,
        targetComments: action.payload,
      };
    case CommentTypes.EDIT_COMMENT_START:
      return {
        ...state,
        error: null
      }
    case CommentTypes.EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        error: null,
        message: "Edit comment successfully!",
        currentComment: action.payload.comment,
        targetComments: editComment(
          state.targetComments,
          action.payload.comment
        ),
      };
    case CommentTypes.DELETE_COMMENT_START:
      return {
        ...state,
        error: null
      }
    case CommentTypes.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        error: null,
        message: "Delete comment successfully!",
        targetComments: deleteComment(state.targetComments, action.payload),
      };
    case CommentTypes.EDIT_REPLY_COMMENT_START:
      return {
        ...state,
        error: null
      }
    case CommentTypes.EDIT_REPLY_COMMENT_SUCCESS:
      return {
        ...state,
        error: null,
        message: "Edit successfully!",
        currentComment: action.payload.comment,
        replyComments: editComment(state.replyComments, action.payload.reply),
      };
    case CommentTypes.DELETE_REPLY_COMMENT_START:
    return {
      ...state,
      error: null
    }
    case CommentTypes.DELETE_REPLY_COMMENT_SUCCESS:
      return {
        ...state,
        error: null,
        message: "Delete successfully!",
        replyComments: deleteComment(state.replyComments, action.payload),
      };
    case HouseTypes.FETCH_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case HouseTypes.SET_SEARCH_HOUSE:
      return {
        ...state,
        searchedHouses: action.payload,
        isSearch: true
      }
    default:
      return state;
  }
};

export default houseReducer;
