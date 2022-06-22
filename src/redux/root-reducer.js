import { combineReducers } from 'redux';
import { reducer as formReducer } from "redux-form";

import authReducer from './auth/auth.reducers';
import dialogReducer from './dialog/dialog.reducers';
import houseReducer from './house/house.reducer';
import notificationReducer from './notification/notification.reducer';
import productReducer from './product/product.reducers';

const rootReducer = combineReducers({
    auth: authReducer,
    dialog: dialogReducer,
    product: productReducer,
    house: houseReducer,
    notification: notificationReducer,

    form: formReducer
});

export default rootReducer;