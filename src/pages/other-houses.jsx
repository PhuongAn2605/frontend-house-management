import isEmpty from "is-empty";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import UserMenu from "../components/UserMenu/UserMenu";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import {
  fetchAllHouseStart,
  getHouseByIdStart,
} from "../redux/house/house.actions";
import SearchBarForm from "../components/search-bar/SearchBar.jsx";
import NavBar from "../components/nav-bar/NavBar.jsx";


const OtherHousesPageStyle = styled.div`
  text-align: center;
  margin: auto;
`;

const HouseTitleStyle = styled.div`
  padding: 1rem;
  font-size: 20px;
  color: #eee;
  font-weight: 700;
  /* background-color: #4b6e7e; */
  background-color: #ebf0f5;
  box-shadow: 5px 5px 5px #888888;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
`;
const OtherHouseStyle = styled.div`
  margin: 1rem 10rem;
  padding: 1rem;
  background-color: #d8c9c9;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #d3aeae;
  }
`;

const HouseNameStyle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #2684bb;
  margin-left: 1rem;
`;

const CenterAllHouses = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const OtherHousePage = ({
  fetchAllHouse,
  houses,
  userName,
  getHouseById,
  targetProducts,
  visitHouse,
  isLoggedIn,
  searchedHouses,
  isSearch,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      fetchAllHouse();
    } else {
      navigate("/");
    }
  }, []);

  const getHouseByIdHandler = async (id) => {
    await getHouseById(id);

    if (!isEmpty(visitHouse)) {
      navigate("/visit-house/" + id);
    }
  };

  const friendHouses = houses.filter((h) => h.name.split("'s")[0] !== userName);
  const otherHouses = isSearch ? searchedHouses : friendHouses;

  return (
    <OtherHousesPageStyle>
      <div>
          <NavBar />
      <HouseTitleStyle>
        <span>Friends' House</span>
        <SearchBarForm
          style={{ width: "50%" }}
          searchHouseName={true}
          friendHouses={friendHouses}
        />
        <UserMenu />
      </HouseTitleStyle>
      </div>

      <CenterAllHouses style={{ margin: "auto" }}>
      {!isEmpty(otherHouses) ? (
        otherHouses.map((h) => (
          <OtherHouseStyle
            key={h._id}
            onClick={() => {
              getHouseByIdHandler(h._id);
            }}
          >
            <OtherHousesIcon color="primary" fontSize="large" />
            <HouseNameStyle>{h.name}</HouseNameStyle>
          </OtherHouseStyle>
        ))
      ) : (
        <OtherHouseStyle>Not found any friends'house!</OtherHouseStyle>
      )}
      </CenterAllHouses>
    </OtherHousesPageStyle>
  );
};

const mapStateToProps = (state) => ({
  houses: state.house.houses,
  userName: state.auth.userName,
  targetProducts: state.house.targetProducts,
  visitHouse: state.house.visitHouse,
  isLoggedIn: state.auth.isLoggedIn,
  searchedHouses: state.house.searchedHouses,
  isSearch: state.house.isSearch,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllHouse: () => dispatch(fetchAllHouseStart()),
  getHouseById: (id) => dispatch(getHouseByIdStart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherHousePage);
