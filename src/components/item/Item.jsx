import SendaImage from "../../images/cach-trong-sen-da-0.jpg";
import DotMenu from "../dot-menu/DotMenu";
import {
  ItemStyle,
  NameStyle,
  FunctionStyle,
  DescriptionStyle,
  ImageStyle,
  ReactionStyle,
  visitItemStyle
} from "./Item.styles";
import { connect } from "react-redux";
import isEmpty from "is-empty";

const Item = (props) => {
  return (
    <ItemStyle>
      {!props.visit && <DotMenu id={props.id} />}
      <ImageStyle>
        <img
          src={props.imageUrl}
          alt={props.productName}
          style={{ width: "200px", height: "200px" }}
        />
      </ImageStyle>
      <NameStyle>{props.productName}</NameStyle>
      <FunctionStyle>{props.functions}</FunctionStyle>
      <DescriptionStyle>{props.description}</DescriptionStyle>
    </ItemStyle>
  );
};

const mapStateToProps = state => ({
  visitHouse: state.house.visitHouse
})

export default connect(mapStateToProps)(Item);
