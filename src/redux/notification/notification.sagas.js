import { put, all, takeLatest, call } from "@redux-saga/core/effects";
import Http from "../../utils/http";
import { fetchFailure } from "../product/product.actions";
import { getLastLoginSuccess } from "./notification.actions";
import NotificationTypes from "./notification.types";

export function* getLastLogin(payload) {
    const userId = payload.payload;
    try{
        const result = yield Http.get("/notification/last-login/" + userId);
        const data = result.data;
        yield put(getLastLoginSuccess(data));
    }catch(error){
        yield put(fetchFailure(error));
    }
}

export function* getLastLoginWatcher() {
    yield takeLatest(NotificationTypes.GET_LAST_LOGIN_START, getLastLogin);
}

export function* notificationSaga() {
    yield all([
        call(getLastLoginWatcher)
    ])
}