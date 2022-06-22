import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import isEmpty from "is-empty";
import { ThemeProvider } from "@mui/material/styles";
import { Field, formValueSelector, reduxForm } from "redux-form";

import ButtonForm from "../../components/button/Button.component";
import {
  theme,
  ErrorTextStyle,
  PasswordButtonStyle,
  AuthPageStyle,
  RightItemsStyle,
} from "../utils/utils.styles";

import {
  fetchLoginStart,
  fetchSignup,
  setErrorConfirmPassword,
} from "../../redux/auth/auth.actions";

import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import LeftItem from "./LeftItem";
import TitleItem from "./TitleItem";
import AuthInputForm from "./AuthInputForm";
import UserImage from "../../images/user.png";
import KeyImage from "../../images/key.png";
import { signupValidation } from "../utils/formValidation";

const PasswordText = styled.p`
  margin-right: auto;
  color: #fff;
`;

let SignUp = ({ signup, errorFromState }) => {
  const [passwordLevel, setPasswordLevel] = useState(0);
  const [isCheckLength, setIsCheckLength] = useState(false);
  const [isCheckLetter, setIsCheckLetter] = useState(false);
  const [errors, setErrors] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const signupHandler = async (userName, password, confirmPassword) => {
    if (password !== confirmPassword) {
      const err = "Confirm password not match!";
      setErrors(err);
      return;
    }

    if (isCheckLength && isCheckLetter) {
      setTimeout(() => {
        signup(userName, password);
      }, 500);
      if (!isEmpty(errorFromState)) {
        const err = "Could not sign you up! Please try again!";
        setErrors(err);
        return;
      }
    } else {
      const err =
        "Password must be in length 8-15, contain at least one uppercase, lowercase, number and special character!";
      setErrors(err);
      return;
    }

    navigate("/login");
  };

  const onChangePasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
    if (password.match(/^.{8,15}$/)) {
      setIsCheckLength(true);
    } else {
      setIsCheckLength(false);
    }

    if (
      password.match(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s)/
      )
    ) {
      setIsCheckLetter(true);
    } else {
      setIsCheckLetter(false);
    }

    if (isCheckLength && isCheckLetter) {
      setPasswordLevel(2);
    } else if (
      (isCheckLetter && !isCheckLength) ||
      (!isCheckLetter && isCheckLength)
    ) {
      setPasswordLevel(1);
    } else {
      setPasswordLevel(0);
    }
  };

  return (
    <AuthPageStyle>
      <LeftItem />
      <RightItemsStyle>
        <TitleItem targetAction="Sign-up" />
        <form className="sign-up">
          <Field
            name="userName"
            component={AuthInputForm}
            image={UserImage}
            placeholder="User Name"
            type="text"
            onChange={(e) => setUserName(e.currentTarget.value)}
          />
          <Field
            name="password"
            component={AuthInputForm}
            image={KeyImage}
            placeholder="Password"
            type="password"
            onChange={(e) => onChangePasswordHandler(e)}
          />

          <Field
            name="confirmPassword"
            component={AuthInputForm}
            image={KeyImage}
            placeholder="Confirm password"
            type="password"
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          />

          {!isEmpty(errors) ? (
            <ErrorTextStyle>{errors.toString()}</ErrorTextStyle>
          ) : (
            <div></div>
          )}

          <PasswordButtonStyle>
            <PasswordText>Password strength</PasswordText>
            <div>
              <HorizontalRuleIcon
                fontSize="large"
                color={passwordLevel > 0 ? "warning" : "disabled"}
              />
              <HorizontalRuleIcon
                fontSize="large"
                color={passwordLevel > 1 ? "warning" : "disabled"}
              />
            </div>
          </PasswordButtonStyle>

          <PasswordButtonStyle>
            <ThemeProvider theme={theme}>
              <ButtonForm
                title="Sign Up"
                variant="contained"
                style={{ color: "#fff", border: "1px solid #fff" }}
                action={() =>
                  signupHandler(userName, password, confirmPassword)
                }
              />
            </ThemeProvider>
            <ButtonForm
              title="Login"
              type="button"
              variant="outlined"
              style={{ color: "#fff", border: "1px solid #fff" }}
              action={() => navigate("/login")}
            />
          </PasswordButtonStyle>
        </form>
      </RightItemsStyle>
    </AuthPageStyle>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isLoggedIn: state.auth.isLoggedIn,
  errorFromState: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (userName, password) => dispatch(fetchSignup(userName, password)),
  setErrorConfirmPassword: (error) => dispatch(setErrorConfirmPassword(error)),
});

SignUp = reduxForm({
  form: "signupForm",
  validate: signupValidation,
})(SignUp);

const selector = formValueSelector("signupForm");

SignUp = connect((state) => ({
  userName: selector(state, "userName"),
  password: selector(state, "password"),
  confirmPassword: selector(state, "confirmPassword"),
}))(SignUp);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
