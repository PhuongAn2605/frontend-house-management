import styled from "styled-components";
import HiImage from "../../images/hi.png";

const TitleItemStyle = styled.div`
  margin: 2rem;
  color: #fff;
  font-weight: 1000;
  font-size: 46px;

  img {
    display: block;
    margin-left: 2rem;
    width: 100px;
    height: 100px;
  }
`;

const SubTitleStyle = styled.div`
  display: flex;
  justify-content: center;
`;

const TextStyle = styled.span`
  color: #fff;
  text-transform: uppercase;
`;

const HereTextStyle = styled.div`
  text-align: center;
`;

const TitleItem = (props) => {
  return (
    <TitleItemStyle>
      <SubTitleStyle>
        <TextStyle>{props.targetAction}</TextStyle>
        <img src={HiImage} />
      </SubTitleStyle>
      <HereTextStyle>Here !</HereTextStyle>
    </TitleItemStyle>
  );
};

export default TitleItem;
