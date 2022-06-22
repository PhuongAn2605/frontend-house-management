import Button from "@mui/material/Button";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchSignup } from "../../redux/auth/auth.actions";

const ButtonStyle = styled.div`
    margin: auto;
    padding: 0.5rem;
`

const ButtonForm = (props) => {

  return (
    <ButtonStyle>
      <Button
        variant={props.variant}
        disabled={props.disabled}
        color={props.color ? props.color : "primary"}
        onClick={props.action}
        style={props.style}
      >
        {props.title}
      </Button>
    </ButtonStyle>
  );
};

export default ButtonForm;
