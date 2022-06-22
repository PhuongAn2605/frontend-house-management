import { put, all, takeLatest, call } from "@redux-saga/core/effects";
import Http from "../../utils/http";
import {
  fetchAllHouseSuccess,
  fetchFailure,
  getCommentsByHouseIdSuccess,
  getHouseByIdSuccess,
  getRepliesByCommentIdSuccess,
  likeCommentSuccess,
  likeHouseSuccess,
  sendCommentSuccess,
  sendReplyCommentSuccess,
} from "./house.actions";
import HouseTypes from "./house.types";

export function* fetchAllHouses() {
  try {
    const result = yield Http.get("/house");
    const data = result.data;
    yield put(fetchAllHouseSuccess(data.houses));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

export function* fetchAllHousesWatcher() {
  yield takeLatest(HouseTypes.FETCH_ALL_HOUSE_START, fetchAllHouses);
}

export function* getHouseById(payload) {
  const id = payload.payload;
  try {
    const result = yield Http.get("/house/" + id);
    const data = result.data;
    yield put(getHouseByIdSuccess(data));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

export function* getHouseByIdWatcher() {
  yield takeLatest(HouseTypes.GET_HOUSE_BY_ID_START, getHouseById);
}

export function* sendComment(payload) {
  const content = payload.payload.comment;
  const commenter = payload.payload.commenter;
  const houseId = payload.payload.visitHouseId;

  try {
    const result = yield Http.post("/comment/create/" + houseId, {
      content,
      commenter,
    });
    const data = result.data;
    yield put(sendCommentSuccess(data));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

export function* sendCommentWatcher() {
  yield takeLatest(HouseTypes.SEND_COMMENT_START, sendComment);
}

export function* sendReplyComment(payload) {
  const content = payload.payload.content;
  const commenter = payload.payload.commenter;
  const commentId = payload.payload.commentId;

  try {
    const result = yield Http.post("/reply/create/" + commentId, {
      content,
      commenter,
    });
    const data = result.data;
    yield put(sendReplyCommentSuccess(data));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

export function* sendReplyCommentWatcher() {
  yield takeLatest(HouseTypes.SEND_REPLY_COMMENT_START, sendReplyComment);
}

export function* getCommentsByHouseId(payload) {
  const houseId = payload.payload;
  try {
    const result = yield Http.get("/comment/" + houseId);
    const data = result.data;
    yield put(getCommentsByHouseIdSuccess(data));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

export function* getCommentsByHouseIdWatcher() {
  yield takeLatest(
    HouseTypes.GET_COMMENTS_BY_HOUSE_ID_START,
    getCommentsByHouseId
  );
}

export function* getRepliesByCommentId(payload) {
  const commentId = payload.payload;
  try {
    const result = yield Http.get("/reply/" + commentId);
    const data = result.data;
    yield put(getRepliesByCommentIdSuccess(data));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

export function* getRepliesByCommentIdWatcher() {
  yield takeLatest(
    HouseTypes.GET_REPLIES_BY_COMMENT_ID_START,
    getRepliesByCommentId
  );
}

export function* likeComment(payload) {
  const { commentId, like, userName } = payload.payload;

  try {
    const result = yield Http.post("/comment-like/" + commentId, {
      like,
      userName,
    });
    const data = result.data;
    yield put(likeCommentSuccess(data));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

export function* likeCommentWatcher() {
  yield takeLatest(HouseTypes.LIKE_COMMENT_START, likeComment);
}

export function* likeHouse(payload) {
  const { like, houseId, userName } = payload.payload;

  try {
    const result = yield Http.post("/house-like/" + houseId, {
      like,
      userName,
    });
    const data = result.data;
    yield put(likeHouseSuccess(data));
  } catch (error) {
    console.log("error: ", error);
    yield put(fetchFailure(error));
  }
}

export function* likeHouseWatcher() {
  yield takeLatest(HouseTypes.LIKE_HOUSE_START, likeHouse);
}


export function* houseSaga() {
  yield all([
    call(fetchAllHousesWatcher),
    call(getHouseByIdWatcher),
    call(sendCommentWatcher),
    call(getCommentsByHouseIdWatcher),
    call(likeCommentWatcher),
    call(likeHouseWatcher),
    call(getRepliesByCommentIdWatcher),
    call(sendReplyCommentWatcher),
  ]);
}
