import NotificationTypes from './notification.types';
import { filterExpireProducts } from './notification.utils';

const INITIAL_STATE = {
    lastLogin: null,
    expireProducts: [],
    error: null
};

const notificationReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case NotificationTypes.GET_LAST_LOGIN_SUCCESS:
            return {
                ...state,
                lastLogin: action.payload.lastLogin
            }
        case NotificationTypes.GET_EXPIRE_PRODUCT_NOTI:
            return {
                ...state,
                expireProducts: filterExpireProducts(action.payload)
            }
        case NotificationTypes.FETCH_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }   
}

export default notificationReducer;