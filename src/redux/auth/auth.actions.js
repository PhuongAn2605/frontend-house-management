import AuthTypes from "./auth.types";


export const logoutAction = () => ({
    type: AuthTypes.LOGOUT
});

export const fetchSignup = ( userName, password ) => ({
    type: AuthTypes.SIGN_UP_START,
    payload: {
        userName, 
        password
    }
});

export const fetchSignupSuccess = result => ({
    type: AuthTypes.SIGN_UP_SUCCESS,
    payload: result
});

export const fetchSignupFailure = error => ({
    type: AuthTypes.SIGN_UP_FAILURE,
    payload: error
});

export const fetchLoginStart = (userName, password, expirationDate) => ({
    type: AuthTypes.LOGIN_START,
    payload: {
        userName,
        password,
        expirationDate
    }
});

export const fetchLoginSuccess = result => ({
    type: AuthTypes.LOGIN_SUCCESS,
    payload: result
});

export const fetchLoginFailure = error => ({
    type: AuthTypes.LOGIN_FAILURE,
    payload: error
});

export const fetchLogoutStart = () => ({
    type: AuthTypes.LOGOUT_START
});

export const fetchLogoutSuccess = () => ({
    type: AuthTypes.LOGOUT_SUCCESS
});

export const fetchLogoutFailure = () => ({
    type: AuthTypes.LOGOUT_FAILURE
});

export const setLogInMode = () => ({
    type: AuthTypes.SET_LOGIN_MODE
})

export const setSignupMode =() => ({
    type: AuthTypes.SET_SIGNUP_MODE
});

export const fetchCheckPasswordStart = (password) => ({
    type: AuthTypes.CHECK_PASSWORD_START,
    payload: password
});

export const fetchCheckPasswordFailure = (error) => ({
    type: AuthTypes.CHECK_PASSWORD_FAILURE,
    payload: error
});

export const fetchCheckPasswordSuccess = (data) => ({
    type: AuthTypes.CHECK_PASSWORD_SUCCESS,
    payload: data
});

export const setErrorConfirmPassword = (error) => ({
    type: AuthTypes.CHECK_ERROR_CONFIRM_PASSWORD,
    payload: error
});




