import DatePicker from "../date-picker/DatePicker";
import styled from "styled-components";
import ExpireProduct from "../expire-product/ExpireProduct.jsx";
import RoomImage from "../../images/isometric-office.gif";
import { SideBarStyle, LastLoginStyle, LastLoginTimeStyle } from "./SideBar";
import { useEffect } from "react";
import { getLastLoginStart } from "../../redux/notification/notification.actions";
import { connect } from "react-redux";
import moment from "moment";
import isEmpty from "is-empty";

const DatePickerStyle = styled.div`
  justify-content: flex-end;
`;

export const HeaderStyle = styled.div`
  margin: 1rem;
  color: #5f5d5d;
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
`;

const SideBar = ({
  visit,
  userId,
  isLoggedIn,
  lastLogin,
  getLastLogin,
  products,
  visitHouse,
}) => {
  useEffect(() => {
    if (isLoggedIn) {
      getLastLogin(userId);
    }
  }, [userId, isLoggedIn, visit]);

  return (
    <SideBarStyle>
      <DatePickerStyle>
        <DatePicker />
      </DatePickerStyle>
      {!visit && <ExpireProduct products={products} visit={visit} />}
      {!visit && isLoggedIn && !isEmpty(lastLogin) && (
        <LastLoginStyle>
          <HeaderStyle>Lần cuối đăng nhập:</HeaderStyle>
          <LastLoginTimeStyle>
            {moment(new Date(lastLogin.loginAt)).format("DD-MM-YYYY")}
          </LastLoginTimeStyle>
        </LastLoginStyle>
      )}
      <HeaderStyle>
        Cấu trúc phòng của {visit && !isEmpty(visitHouse) ? visitHouse.name : "tôi"}
      </HeaderStyle>
      <img src={RoomImage} alt="cấu trúc phòng" />
    </SideBarStyle>
  );
};

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  lastLogin: state.notification.lastLogin,
  isLoggedIn: state.auth.isLoggedIn,
  visitHouse: state.house.visitHouse,
});

const mapDispatchToProps = (dispatch) => ({
  getLastLogin: (userId) => dispatch(getLastLoginStart(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
