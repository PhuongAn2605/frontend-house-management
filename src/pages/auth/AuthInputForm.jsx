import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./custom.css";

const AuthInputFormStyle = styled.div`
  margin: 1rem auto;
  width: 100%;
`;
const ErrorText = styled.div`
  color: red;
  font-weight: 550;
`;

const AuthInputForm = ({
  type,
  placeholder,
  onChange,
  image,
  label,
  input,
  meta: { touched, error, invalid },
  ...custom
}) => {
  return (
    <AuthInputFormStyle>
      <TextField
        type={type}
        label={label}
        placeholder={placeholder}
        // onChange={onChange}
        error={touched && invalid}
        {...input}
        {...custom}
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          width: "300px",
        }}
        InputProps={{
          startAdornment: (
            <img
              src={image}
              style={{
                width: "20px",
                height: "20px",
                display: "inline-block",
                marginRight: "0.5rem",
              }}
              alt="User"
            />
          ),
        }}
      />
      {touched && error && <ErrorText>{error}</ErrorText>}
    </AuthInputFormStyle>
  );
};

export default AuthInputForm;
