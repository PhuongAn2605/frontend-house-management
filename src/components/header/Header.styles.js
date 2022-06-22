import styled from "styled-components";

export const HeaderStyle = styled.div`
  margin: 0 !important;
  /* width: 100%; */
  height: 10%;
  background-color: #9eb5c3;
  padding: 1.5rem;
  font-size: 1rem;
  color: #eee;
  display: flex;
`;

export const LeftHeaderItem = styled.div`
  margin-left: 1rem;
  margin-right: auto;
  cursor: pointer;
`;

export const RightHeaderItem = styled.div`
  margin-right: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  a{
  text-decoration: none;
  color: #eee;
  }

`;
