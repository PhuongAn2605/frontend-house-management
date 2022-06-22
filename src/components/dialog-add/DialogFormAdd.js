import styled from "styled-components";

export const DialogStyle = styled.div`
    margin-left: auto;

    button{
        border: none !important;
    }
`

export const AddDialogStyle = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto !important;
  margin-right: 2.5rem;

  padding: 0.5rem 1rem;
  background-color: #459add;
  border-radius: 30px;
  span {
    color: #fff;
    font-weight: 400;
    font-size: 15px;
    margin: 0 0.2rem;
  }
  :hover {
    cursor: pointer;
    border: none;
  }
`;

export const AddTextStyle = styled.span`
    color: #459add;
    text-transform: uppercase;
    font-weight: 500;

    button {
        margin-left: auto;
    }
`

export const InputFormStyle = styled.div`
    width: 100%;
`
