import React from "react";
import { put, all, takeLatest, call } from "@redux-saga/core/effects";
import { CommentTypes } from "./comment.types";
import {
  deleteCommentSuccess,
  deleteReplyCommentSuccess,
  editCommentSuccess,
  editReplyCommentSuccess,
  fetchFailure,
} from "./comment.actions";
import Http from "../../utils/http";

export function* editComment(payload) {
  const { commentId, content } = payload.payload;
  try {
    const result = yield Http.patch("/comment/edit/" + commentId, {
      content,
    });
    const data = result.data;

    yield put(editCommentSuccess(data));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

export function* editCommentWatcher() {
  yield takeLatest(CommentTypes.EDIT_COMMENT_START, editComment);
}

export function* deleteComment(payload) {
  const commentId = payload.payload;

  try {
    Http.delete("/comment/delete/" + commentId);

    yield put(deleteCommentSuccess(commentId));
  } catch (err) {
    yield put(fetchFailure(err));
  }
}

export function* deleteCommentWatcher() {
  yield takeLatest(CommentTypes.DELETE_COMMENT_START, deleteComment);
}

export function* editReplyComment(payload) {
  const { replyId, content } = payload.payload;
  try {
    const result = yield Http.patch("/reply/edit/" + replyId, {
      content,
    });
    const data = result.data;

    yield put(editReplyCommentSuccess(data));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

export function* editReplyCommentWatcher() {
  yield takeLatest(CommentTypes.EDIT_REPLY_COMMENT_START, editReplyComment);
}

export function* deleteReplyComment(payload) {
  const replyId = payload.payload;

  try {
    Http.delete("/reply/delete/" + replyId);

    yield put(deleteReplyCommentSuccess(replyId));
  } catch (err) {
    yield put(fetchFailure(err));
  }
}

export function* deleteReplyCommentWatcher() {
  yield takeLatest(CommentTypes.DELETE_REPLY_COMMENT_START, deleteReplyComment);
}

export function* commentSaga() {
  yield all([
    call(editCommentWatcher),
    call(deleteCommentWatcher),
    call(editReplyCommentWatcher),
    call(deleteReplyCommentWatcher),
  ]);
}
