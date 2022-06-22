import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

import { InputStyle } from "./Input.styles";
import { InputAdornment } from "@mui/material";
import "./Input.styles.css";
import styled from "styled-components";

const ErrorText = styled.div`
  color: red;
`;

const InputForm = ({
  id,
  name,
  type,
  style,
  onChange,
  value,
  onKeyPress,
  icon,
  label,
  input,
  meta: { touched, error, invalid},
  ...custom
}) => {
  return (
    <InputStyle>
      <FormControl variant="standard">
        <InputLabel htmlFor={id}>{id}</InputLabel>
        <Input
          id={id}
          type={type}
          label={label}
          error={touched && invalid}
          {...input}
          {...custom}
          style={style}
          startAdornment={
            <InputAdornment position="start">{icon}</InputAdornment>
          }
        />
      {touched && error && <ErrorText>{error}</ErrorText>}

      </FormControl>
    </InputStyle>
  );
};
// const forwardedRef = React.forwardRef(InputForm);
export default InputForm;
