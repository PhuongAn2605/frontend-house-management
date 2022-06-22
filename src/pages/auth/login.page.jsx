import React, { useState } from "react";
import ButtonForm from "../../components/button/Button.component";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLoginStart } from "../../redux/auth/auth.actions";
import { ThemeProvider } from "@mui/material/styles";
import { Field, formValueSelector, reduxForm } from "redux-form";

import UserImage from "../../images/user.png";
import KeyImage from "../../images/key.png";
import "./custom.css";

import isEmpty from "is-empty";

import {
  theme,
  ErrorTextStyle,
  PasswordButtonStyle,
  TextHeaderStyle,
  AuthPageStyle,
  LeftItemsStyle,
  RightItemsStyle,
} from "../utils/utils.styles";
import LeftItem from "./LeftItem";
import TitleItem from "./TitleItem";
import AuthInputForm from "./AuthInputForm";
import { loginValidation } from "../utils/formValidation";

let Login = ({ login, errorFormState }) => {
  const [userNameValue, setUserNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const changeNameInputHandler = (e) => {
    setUserNameValue(e.currentTarget.value);
  };
  const changePasswordInputHandler = (e) => {
    setPasswordValue(e.currentTarget.value);
  };

  const loginHandler = (userName, password, e) => {
    e.preventDefault();
    if(userName && password){
      setTimeout(() => {
        login(userName, password);
      }, 1000);
    }

    if (!isEmpty(errorFormState)) {
      setErrors("Opps, wrong username or password!");
      return;
    } else {
      navigate("/");
    }
  };

  return (
    <AuthPageStyle>
      <LeftItem />
      <RightItemsStyle>
        <TitleItem targetAction="Login" />
        <form className="login">
          <Field
            name="userName"
            component={AuthInputForm}
            image={UserImage}
            placeholder="User Name"
            type="text"
            onChange={(e) => changeNameInputHandler(e)}
          />
          <Field
            name="password"
            component={AuthInputForm}
            image={KeyImage}
            placeholder="Password"
            type="password"
            onChange={(e) => changePasswordInputHandler(e)}
          />

          {!isEmpty(errors) && (
            <ErrorTextStyle>{errors.toString()}</ErrorTextStyle>
          )}

          <PasswordButtonStyle>
            <ThemeProvider theme={theme}>
              <ButtonForm
                title="Login"
                variant="contained"
                style={{ color: "#fff", border: "1px solid #fff" }}
                action={(e) => loginHandler(userNameValue, passwordValue, e)}
              />
            </ThemeProvider>
            <ButtonForm
              title="Sign Up"
              type="button"
              variant="outlined"
              style={{ color: "#fff", border: "1px solid #fff" }}
              action={() => navigate("/signup")}
            />
          </PasswordButtonStyle>
        </form>
      </RightItemsStyle>
    </AuthPageStyle>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (userNameValue, passwordValue) =>
    dispatch(fetchLoginStart(userNameValue, passwordValue, null)),
});

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  errorFormState: state.auth.error,
});

Login = reduxForm({
  form: "loginForm",
  validate: loginValidation
})(Login);

const selector = formValueSelector("loginForm");

Login = connect(state => ({
  userName: selector(state, "userName"),
  password: selector(state, "password")
}))(Login);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
