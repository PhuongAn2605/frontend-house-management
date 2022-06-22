import {
    NewProductStyle,
    LeftItemsStyle,
    WelcomeTextStyle,
    TitleStyle
  } from "../utils/utils.styles";
import NewProductTeamImage from "../../images/isometric-office.gif";
  

const LeftItem = () => {
    return (
        <LeftItemsStyle>
        <TitleStyle>
          <WelcomeTextStyle>Welcome to</WelcomeTextStyle>
          <NewProductStyle>New Product Team</NewProductStyle>
        </TitleStyle>
        <img src={NewProductTeamImage} alt="new-team" />
      </LeftItemsStyle>
    )
}

export default LeftItem;