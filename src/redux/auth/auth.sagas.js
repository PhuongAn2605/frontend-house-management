import { put, all, takeLatest, call } from "@redux-saga/core/effects";
import isEmpty from "is-empty";
import Http from "../../utils/http";
import { fetchProductStart, fetchProductSuccess } from "../product/product.actions";
import {
  fetchLoginFailure,
  fetchLoginSuccess,
  fetchLogoutFailure,
  fetchLogoutSuccess,
  fetchSignupFailure,
  fetchSignupSuccess,
  fetchCheckPasswordFailure,
  fetchCheckPasswordSuccess,
} from "./auth.actions";
import AuthTypes from "./auth.types";

export function* fetchSignup(payload) {
  const { userName, password } = payload.payload;
  try {
    const result = yield Http.post("/user/signup", {
      userName,
      password,
    });
    const data = result.data;

    yield put(fetchSignupSuccess(data));
  } catch (error) {
    yield put(fetchSignupFailure(error));
  }
}

export function* fetchSignupWatcher() {
  yield takeLatest(AuthTypes.SIGN_UP_START, fetchSignup);
}

export function* fetchLogin(payload) {
  const { userName, password } = payload.payload;

  try {
    const result = yield Http.post("/user/login", {
      userName,
      password,
    });

    const data = result.data;
    if (!isEmpty(data)) {
      yield put(fetchLoginSuccess(data));
      yield put(fetchProductStart({ userName: data.userName }));
    } else {
      yield put(fetchLoginFailure("error"));
    }
  } catch (error) {
    yield put(fetchLoginFailure(error));
  }
}

export function* fetchLoginWatcher() {
  yield takeLatest(AuthTypes.LOGIN_START, fetchLogin);
}

export function* fetchLogout() {
  try {
    yield Http.get("/user/logout");
    yield put(fetchLogoutSuccess());
  } catch (error) {
    yield put(fetchLogoutFailure());
  }
}

export function* fetchLogoutWatcher() {
  yield takeLatest(AuthTypes.LOGOUT_START, fetchLogout);
}

export function* fetchCheckPassword(payload) {
  const password = payload.payload;
  try {
    const result = yield Http.post("/user/check-password", {
      password,
    });
    yield put(fetchCheckPasswordSuccess(result));
  } catch (error) {
    yield put(fetchCheckPasswordFailure(error));
  }
}

export function* fetchCheckPasswordWatcher() {
  yield takeLatest(AuthTypes.CHECK_PASSWORD_START, fetchCheckPassword);
}

export function* authSaga() {
  yield all([
    call(fetchSignupWatcher),
    call(fetchLoginWatcher),
    call(fetchLogout),
    call(fetchCheckPasswordWatcher),
  ]);
}
