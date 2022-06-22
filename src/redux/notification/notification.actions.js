import NotificationTypes from "./notification.types";

export const getLastLoginStart = (userId) => ({
    type: NotificationTypes.GET_LAST_LOGIN_START,
    payload: userId
});

export const getLastLoginSuccess = (result) => ({
    type: NotificationTypes.GET_LAST_LOGIN_SUCCESS,
    payload: result
});

export const getExpireProductNoti = (products) => ({
    type: NotificationTypes.GET_EXPIRE_PRODUCT_NOTI,
    payload: products
});

export const fetchFailure = (error) => ({
    type: NotificationTypes.FETCH_FAILURE,
    payload: error
})