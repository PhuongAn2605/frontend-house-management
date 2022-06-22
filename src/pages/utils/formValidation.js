const validateLength = (string, min, max) => max ? string.length >= min && string.length <= max : string.length >= min;
const passwordReg = new RegExp(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s)/);
const validatePasswordLength = password => validateLength(password, 8, 15);
const validatePasswordReg = password => passwordReg.test(password);

const REQUIRE = 'This field is required!';
const PASSWORD_LENGTH_ERROR = 'Password must be from 8 to 15 characters long';
const PASSWORD_REG_ERROR = 'Password must contain at least 1 uppercase, 1 lowercase, 1 digit and 1 special character';
const CONFIRM_PASSWORD_ERROR = 'Confirm password does not much';

export const loginValidation = values => {
    const error ={};
    if(!values.userName){
        error.userName = REQUIRE;
    }
    if(!values.password){
        error.password = REQUIRE;
    }else if(!validatePasswordLength(values.password)){
        error.password = PASSWORD_LENGTH_ERROR;
    }
    return error;
}

export const signupValidation = values => {
    const error = {};
    if(!values.userName){
        error.userName = REQUIRE;
    }
    if(!values.password){
        error.password = REQUIRE;
    }else if(!validatePasswordLength(values.password)){
        error.password = PASSWORD_LENGTH_ERROR;
    }else if(!validatePasswordReg(values.password)){
        error.password = PASSWORD_REG_ERROR;
    }

    if(!values.confirmPassword){
        error.confirmPassword = REQUIRE;
    }else if(values.password !== values.confirmPassword){
        error.confirmPassword = CONFIRM_PASSWORD_ERROR;
    }

    return error;
}