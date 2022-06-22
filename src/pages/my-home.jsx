import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SearchBarForm from "../components/search-bar/SearchBar";
import NavBar from "../components/nav-bar/NavBar.jsx";
import Item from "../components/item/Item";
import UserMenu from "../components/UserMenu/UserMenu";
import SideBar from "../components/sidebar/SideBar.jsx";
import { openDialog } from "../redux/dialog/dialog-actions";
import { connect } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import Badge from "@mui/material/Badge";
import DialogFormAdd from "../components/dialog-add/DialogFormAdd.jsx";
import {
  cancelSearch,
  setSearchByLocation,
  setSearchByName,
} from "../redux/product/product.actions";
import isEmpty from "is-empty";
import DialogComment from "../components/dialog-comment/DialogComment.jsx";
import {
  getHouseByIdStart,
  likeHouseStart,
  setHouseComments,
  setHouseLikes,
} from "../redux/house/house.actions";
import { getLastLoginStart } from "../redux/notification/notification.actions";

import { Navigate, useNavigate, useParams } from "react-router";
import moment from "moment";

const MyHomeStyle = styled.div`
  display: flex;
  flex-direction: row;
  height: 100% !important;
  width: 100% !important;
`;
const HeaderStyle = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 4.2fr;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: #ebf0f5;
  box-shadow: 5px 5px 5px #888888;
  /* margin-right: 1rem; */

`;

const NavBarStyle = styled.div``;

const ItemsStyle = styled.div`
  /* margin: 1rem; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const WelcomeText = styled.div`
  text-transform: uppercase;
  font-weight: 1000;
  font-size: 20px;
  color: #3173a5;
`;

const SearchFormStyle = styled.div`
  margin-left: 1rem;
`;

const UserNameStyle = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 2rem;
`;

const DisplayItemsStyle = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr;
  margin-top: 1rem;
`;

const SideBarStyle = styled.div`
  margin: 0.5rem;
  @media (max-width: 800px) {
    display: none;
  }
`;

const ItemDetailStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: min-content;
  justify-content: center;
  align-items: flex-start;
  margin: 0 1rem;
`;

const SearchConditionStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  span:hover {
    background-color: #dae5ec;
  }
`;

const NormalSearchConditionStyle = styled.span`
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  color: #3173a5;
  padding: 0.3rem 0.5rem;
  background-color: #fff;
  box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
  cursor: pointer;
`;

const ChoosedSearchConditionStyle = styled.span`
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  color: #3173a5;
  padding: 0.3rem 0.5rem;
  background-color: #dae5ec;
  box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
  cursor: pointer;
`;

const AddDialogStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  margin-right: 28rem;

  padding: 0.5rem 1rem;
  background-color: #459add;
  border-radius: 30px;
  span {
    color: #fff;
    font-weight: 600;
    font-size: 18px;
    margin: 0 0.2rem;
  }
  :hover {
    cursor: pointer;
  }
`;

const MessageTextStyle = styled.div`
  color: green;
  font-weight: 600;
  text-align: center;
  font-size: 20px;
  margin: auto;
`;

const ReactionStyle = styled.div`
  margin: 0 3rem;
  display: flex;
  justify-content: space-around !important;
  align-items: center !important;
`;

const MyHome = ({
  products,
  comments,
  setSearchByName,
  setSearchByLocation,
  isSearchByName,
  isSearchByLocation,
  searchedProducts,
  isSearched,
  cancelSearch,
  visit,
  visitHouse,
  houseId,
  userName,
  likeHouse,
  houseLikes,
  authHouseLikes,
  setHouseLikes,
  setHouseComments,
  isLoggedIn,
  authComments,

}) => {
  // const houseIdParam = useParams().houseId;
  // console.log(houseIdParam);

  const navigate = useNavigate();
  const [isLikeHouse, setIsLikeHouse] = useState(false);
  const [likeHouseCount, setLikeHouseCount] = useState(
    houseLikes && houseLikes.length
  );
  const [initialLike, setInitialLike] = useState(true);

  useEffect(() => {
    cancelSearch();
    if (!isEmpty(houseId) && !visit) {
      setHouseLikes(authHouseLikes);
      houseLikes = [...authHouseLikes];
      setLikeHouseCount(houseLikes.length);

      setHouseComments(authComments);
      comments = [...authComments];
    }
    setInitialLike(true);
    for (let like of houseLikes) {
      if (userName === like.userName) {
        setIsLikeHouse(true);
        return;
      }
    }
  }, []);

  if (isSearched) {
    products = [...searchedProducts];
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!initialLike) {
      if (visit && !isEmpty(visitHouse)) {
        likeHouse(isLikeHouse, visitHouse._id, userName);
      } else {
        likeHouse(isLikeHouse, houseId, userName);
      }

      if (isLikeHouse) {
        setLikeHouseCount(likeHouseCount + 1);
      } else {
        setLikeHouseCount(likeHouseCount - 1);
      }
    }
  }, [isLikeHouse]);

  const likeHouseHandler = (e) => {
    setIsLikeHouse(!isLikeHouse);
    setInitialLike(false);
  };

  const initialValues = {
    expiration: moment().format('YYYY-MM-DD'),
    functions: 'sit'
  }

  return (
    <div>
      <MyHomeStyle>
        <NavBarStyle>
          <NavBar />
        </NavBarStyle>
        <ItemsStyle>
          <HeaderStyle>
            <WelcomeText>
              <div>
                {visit && !isEmpty(visitHouse) ? (
                  <p>Welcome to {visitHouse.name}</p>
                ) : (
                  <p>My home</p>
                )}
                <ReactionStyle>
                  {!isLikeHouse ? (
                    <Badge
                      badgeContent={likeHouseCount > 0 ? likeHouseCount : "0"}
                      color="error"
                    >
                      <FavoriteBorderIcon
                        fontSize="large"
                        onClick={(e) => likeHouseHandler(e)}
                      />
                    </Badge>
                  ) : (
                    <Badge
                      badgeContent={likeHouseCount > 0 ? likeHouseCount : "0"}
                      color="error"
                    >
                      <FavoriteIcon
                        fontSize="large"
                        onClick={(e) => likeHouseHandler(e)}
                      />
                    </Badge>
                  )}
                  <DialogComment visit={visit} />
                  {/* <ChatBubbleOutlineOutlinedIcon fontSize="large" /> */}
                </ReactionStyle>
              </div>
            </WelcomeText>
            <SearchFormStyle>
              <SearchBarForm visit={visit} style={{ width: "120%" }} />
              <SearchConditionStyle>
                {isSearchByName && !isSearchByLocation ? (
                  <ChoosedSearchConditionStyle
                    onClick={() => setSearchByName()}
                  >
                    Tên
                  </ChoosedSearchConditionStyle>
                ) : (
                  <NormalSearchConditionStyle
                    id="search-name"
                    onClick={() => setSearchByName()}
                  >
                    Tên
                  </NormalSearchConditionStyle>
                )}
                {isSearchByLocation && !isSearchByName ? (
                  <ChoosedSearchConditionStyle
                    onClick={() => setSearchByLocation()}
                  >
                    Vị trí
                  </ChoosedSearchConditionStyle>
                ) : (
                  <NormalSearchConditionStyle
                    id="search-location"
                    onClick={() => setSearchByLocation()}
                  >
                    Vị trí
                  </NormalSearchConditionStyle>
                )}
              </SearchConditionStyle>
            </SearchFormStyle>
            <UserNameStyle>
              <PermIdentityOutlinedIcon />
              <UserMenu />
            </UserNameStyle>
          </HeaderStyle>
          {!visit && <DialogFormAdd initialValues={initialValues} />}
          <DisplayItemsStyle>
            <ItemDetailStyle>
              {!isEmpty(products) &&
                products.map((p) => (
                  <Item
                    key={p._id}
                    id={p._id}
                    imageUrl={`http://localhost:5000/${p.image}`}
                    productName={p.productName}
                    functions={p.functions}
                    description={p.description}
                    visit={visit}
                  />
                ))}
            </ItemDetailStyle>
            <SideBarStyle>
              <SideBar visit={visit} products={products} />
            </SideBarStyle>
          </DisplayItemsStyle>
        </ItemsStyle>
      </MyHomeStyle>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  openDialog: () => dispatch(openDialog()),
  setSearchByName: () => dispatch(setSearchByName()),
  setSearchByLocation: () => dispatch(setSearchByLocation()),
  likeHouse: (like, houseId, userName) =>
    dispatch(likeHouseStart(like, houseId, userName)),
  setHouseLikes: (houseLikes) => dispatch(setHouseLikes(houseLikes)),
  setHouseComments: (houseComments) =>
    dispatch(setHouseComments(houseComments)),
  getHouseById: (houseId) => getHouseByIdStart(houseId),
  cancelSearch: () => dispatch(cancelSearch()),
});

const mapStateToProps = (state) => ({
  isSearchByName: state.product.isSearchByName,
  isSearchByLocation: state.product.isSearchByLocation,
  searchedProducts: state.product.searchedProducts,
  visitHouse: state.house.visitHouse,
  houseId: state.auth.houseId,
  userName: state.auth.userName,
  houseLikes: state.house.houseLikes,
  authHouseLikes: state.auth.houseLikes,
  comments: state.house.targetComments,
  isLoggedIn: state.auth.isLoggedIn,
  authComments: state.auth.comments,
  isSearched: state.product.isSearched,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyHome);
