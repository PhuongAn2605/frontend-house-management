import React, { useEffect, useState } from "react";
import { red } from "@mui/material/colors";
import { blue } from "@mui/material/colors";
import Badge from "@mui/material/Badge";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  CommentItemStyle,
  CommentStyle,
  ContentStyle,
  CommenterStyle,
  CommentContentStyle,
  CommentContentRightStyle,
  DisplayReplyCommentStyle,
  CommentDetailsStyle,
  TimeTrackStyle,
  DeleteEditActionStyle,
  AdditionStyle,
} from "./CommentItem.js";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyIcon from "@mui/icons-material/Reply";
import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone";
import {
  getRepliesByCommentIdStart,
  likeCommentStart,
} from "../../redux/house/house.actions.js";
import { connect } from "react-redux";
import isEmpty from "is-empty";
import CommentInput from "../input/CommentInput.jsx";
import moment from "moment";
import DialogEditComment from "../dialog-edit-comment/DialogEditComment.jsx";
import {
  deleteCommentStart,
  deleteReplyCommentStart,
} from "../../redux/comment/comment.actions.js";

let CommentItem = ({
  userName,
  comment,
  likeComment,
  getRepliesByCommentId,
  replyComments,
  visit,
  isReplied,
  deleteComment,
  deleteReplyComment,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isReply, setIsReply] = useState(isReplied);
  const [initialLike, setInitialLike] = useState(true);
  const [showDeleteEditAction, setShowDeleteEditAction] = useState(false);

  const { commenter, content, commentLikes } = !isEmpty(comment) && comment;
  const commentId = !isEmpty(comment) && comment._id;

  const [commentLikeCount, setCommentLikeCount] = useState(
    commentLikes && commentLikes.length
  );

  useEffect(() => {
    setInitialLike(true);

    if (!isEmpty(commentLikes)) {
      for (let like of commentLikes) {
        if (like.commentId === commentId && like.userName === userName) {
          setIsLiked(true);
          return;
        }
      }
      setCommentLikeCount(commentLikes.length);
    }
  }, [commentId, userName, commentLikes]);

  const onLikeClickHandler = () => {
    setIsLiked(!isLiked);
    setInitialLike(false);
  };

  const replyCommentHandler = (e) => {
    getRepliesByCommentId(commentId);
    setIsReply(!isReply);
  };

  useEffect(() => {
    if (!initialLike) {
      if (isLiked) {
        setCommentLikeCount(commentLikeCount + 1);
      } else {
        if (commentLikeCount > 0) {
          setCommentLikeCount(commentLikeCount - 1);
        }
      }
      likeComment(commentId, isLiked, userName);
    }
  }, [isLiked]);

  const deleteCommentHandler = () => {
    alert("Are you sure to delete?");
    if (isReplied) {
      deleteReplyComment(commentId);
    } else {
      deleteComment(commentId);
    }
  };

  const DisplayReplyComment = () => {
    let targetReplyComments = [];
    if (!isEmpty(replyComments)) {
      targetReplyComments = replyComments.filter(
        (r) => r.commentId === commentId
      );
    }

    return (
      <CommentItemStyle
        onMouseOut={() => setShowDeleteEditAction(true)}
        onMouseLeave={() => setShowDeleteEditAction(false)}
      >
        {!isEmpty(targetReplyComments) &&
          targetReplyComments.map((r) => {
            return (
              <DisplayReplyCommentStyle>
                <CommentItem
                  key={r._id}
                  comment={r}
                  userName={userName}
                  likeComment={likeComment}
                  commentLikes={commentLikes}
                  isReplied={true}
                  deleteReplyComment={deleteReplyComment}
                />
              </DisplayReplyCommentStyle>
            );
          })}
        {!isReplied && (
          <CommentInput
            name="comment"
            component={CommentInput}
            commentId={commentId}
            isComment={false}
            visit={visit}
            title={
              commenter === userName
                ? "Trả lời chính bạn"
                : "Trả lời " + commenter
            }
          />
        )}
      </CommentItemStyle>
    );
  };

  return (
    <CommentStyle onMouseOut={() => setShowDeleteEditAction(true)}
    onMouseLeave={() => setShowDeleteEditAction(false)}>
      <CommentDetailsStyle>
        <CommentContentStyle>
          <CommentTwoToneIcon color={isReply ? "success" : "primary"} />
          &nbsp;&nbsp;&nbsp;
          <CommenterStyle>
            {commenter === userName ? "Bạn" : commenter}
            &nbsp;&nbsp;&nbsp;
          </CommenterStyle>
          <ContentStyle>{content}</ContentStyle>
          {isReply && <DisplayReplyComment key={commentId} />}
        </CommentContentStyle>
        {!isReplied && (
          <CommentContentRightStyle>
            <ReplyIcon
              style={{ color: blue[500] }}
              onClick={(e) => replyCommentHandler(e)}
            />
            {!isLiked ? (
              <Badge
                badgeContent={commentLikeCount > 0 ? commentLikeCount : "0"}
              >
                <FavoriteBorderIcon
                  style={{ color: red[600] }}
                  onClick={() => onLikeClickHandler()}
                />
              </Badge>
            ) : (
              <Badge
                badgeContent={commentLikeCount > 0 ? commentLikeCount : "0"}
              >
                <FavoriteOutlinedIcon
                  style={{ color: red[600] }}
                  onClick={() => onLikeClickHandler()}
                />
              </Badge>
            )}
          </CommentContentRightStyle>
        )}
      </CommentDetailsStyle>
      <AdditionStyle>
        <TimeTrackStyle>
          {moment(!isEmpty(comment) && comment.createdAt).fromNow()}
        </TimeTrackStyle>
        {(userName === commenter) && showDeleteEditAction && (
          <DeleteEditActionStyle>
            <DialogEditComment comment={comment} isReplied={isReplied} />
            <DeleteForeverIcon
              fontSize="small"
              color="action"
              onClick={() => deleteCommentHandler()}
            />
          </DeleteEditActionStyle>
        )}
      </AdditionStyle>
    </CommentStyle>
  );
};

const mapDispatchToProps = (dispatch) => ({
  likeComment: (commentId, like, userName) =>
    dispatch(likeCommentStart(commentId, like, userName)),
  getRepliesByCommentId: (commentId) =>
    dispatch(getRepliesByCommentIdStart(commentId)),
  deleteComment: (commentId) => dispatch(deleteCommentStart(commentId)),
  deleteReplyComment: (replyId) => dispatch(deleteReplyCommentStart(replyId)),
});

const mapStateToProps = (state) => ({
  replyComments: state.house.replyComments,
  userName: state.auth.userName,
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
