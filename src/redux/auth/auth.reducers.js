import AuthTypes from "./auth.types";
import { login } from "./auth.utils";
import { useNavigate } from "react-router-dom";

const INITIAL_STATE = {
  isLoggedIn: false,
  userName: null,
  userId: null,
  token: null,
  tokenExpirationDate: null,
  error: null,
  isLogInMode: true,
  isSignupMode: false,
  password: null,
  houseId: null,
  houseLikes: [],
  products: [],
  comments: []
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.SIGN_UP_START:
      return {
        ...state,
        error: null
      }
    case AuthTypes.SIGN_UP_SUCCESS:
      const { userName, token } = action.payload;

      return {
        ...state,
        isLoggedIn: true,
        userName: action.payload.userName,
        token: action.payload.token,
        tokenExpirationDate: login(userName, token),
        error: null,
      };

    case AuthTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        error: action.payload,
      };
    case AuthTypes.LOGIN_START:
      return {
        ...state,
        error: null
      }
    case AuthTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        userName: action.payload.userName,
        userId: action.payload.userId,
        houseId: action.payload.houseId,
        products: action.payload.products,
        houseLikes: action.payload.houseLikes,
        comments: action.payload.comments,
        password: action.payload.password,
        error: null,
        tokenExpirationDate: login(
          action.payload.userName,
          action.payload.password,
          action.payload.token,
          null
        ),
      };


    case AuthTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        error: action.payload,
      };
    case AuthTypes.LOGOUT_START:
      return {
        ...state,
        error: null
      }
    case AuthTypes.LOGOUT_SUCCESS:
      localStorage.removeItem("userData");
      return {
        ...state,
        isLoggedIn: false,
        error: null,
        token: null,
        tokenExpirationDate: null,
        userId: null,
      };

    case AuthTypes.LOGOUT_FAILURE:
      return {
        ...state,
      };

    case AuthTypes.SET_LOGIN_MODE:
      return {
        ...state,
        isLogInMode: true,
        isSignupMode: false,
      };
    case AuthTypes.SET_SIGNUP_MODE:
      return {
        ...state,
        isSignupMode: true,
        isLogInMode: false,
      };
    case AuthTypes.CHECK_PASSWORD_START:
      return {
        ...state,
        error: null
      }
    case AuthTypes.CHECK_PASSWORD_SUCCESS:
      return {
        ...state,
        password: action.payload,
        error: null,
      };
    case AuthTypes.CHECK_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case AuthTypes.SET_ERROR_CONFIRM_PASSWORD:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
