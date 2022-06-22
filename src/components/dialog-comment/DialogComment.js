import styled from "styled-components";
import "./DialogComment.css";

export const DialogStyle = styled.div`
  margin-left: auto;

  button {
    border: none !important;
  }
`;

export const AddDialogStyle = styled.div`
  display: flex;
  /* justify-content: flex-end; */
  /* align-items: center; */
  /* margin-left: auto !important; */

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
`;

export const InputFormStyle = styled.div`
  width: 100%;
`;

export const CommentStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  width: 100%;
`;

export const CommenterStyle = styled.div`
  color: #e97e0f;
  font-weight: 600;
`;

export const CommentContentStyle = styled.div`
  display: flex;
`;

export const OtherCommentsStyle = styled.div`
  font-weight: 600;
  font-size: 20px;
`;
export const CommentContentRightStyle = styled.div`
  margin-left: auto;
`;
export const ContentStyle = styled.div``;

export const CommentSpanStyle = styled.div`
  font-size: 10px;
`;

export const LargeCommentDivStyle = styled.div`
  width: 100%;
`;

export const DisplayCommentStyle = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #eee;
  border-radius: 10px;
`;
