import isEmpty from "is-empty";
import SearchBar from "material-ui-search-bar";
import { useState } from "react";
import { connect } from "react-redux";
import { setSearchedHouses } from "../../redux/house/house.actions";
import {
  searchProductByLocationStart,
  searchProductByNameStart,
  setSearchState,
} from "../../redux/product/product.actions";

const SearchBarForm = ({
  isSearchByName,
  isSearchByLocation,
  searchProductByName,
  searchProductByLocation,
  setSearchState,
  isSearched,
  visit,
  visitHouse,
  houseId,
  style,
  searchHouseName,
  friendHouses,
  setSearchedHouses
}) => {
  const [searchValue, setSearchValue] = useState("");

  const searchHandler = (e) => {
    setSearchState();
    const targetHouseId = visit ? visitHouse._id : houseId;

    if (isSearchByName && !isSearchByLocation) {
      searchProductByName(targetHouseId, searchValue);
    } else if (!isSearchByName && isSearchByLocation) {
      searchProductByLocation(targetHouseId, searchValue);
    }

    if(searchHouseName && !isEmpty(friendHouses)){
      if(!isEmpty(searchValue)){
        const normalizeSearchValue = searchValue.toLowerCase();
        const searchedHouses = friendHouses.filter(h => h.name.toLowerCase().includes(normalizeSearchValue));
        setSearchedHouses(searchedHouses);
      }else{
        setSearchedHouses(friendHouses);
      }
    } 
  };

  return (
    <SearchBar
      value={searchValue}Dia
      onChange={(value) => setSearchValue(value)}
      onRequestSearch={(e) => searchHandler(e)}
      style ={style}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  searchProductByName: (targetHouseId, productName) =>
    dispatch(searchProductByNameStart(targetHouseId, productName)),
  searchProductByLocation: (targetHouseId, location) =>
    dispatch(searchProductByLocationStart(targetHouseId, location)),
    setSearchState: () => dispatch(setSearchState()),
    setSearchedHouses: (searchedHouses) => dispatch(setSearchedHouses(searchedHouses))
});

const mapStateToProps = (state) => ({
  isSearchByName: state.product.isSearchByName,
  isSearchByLocation: state.product.isSearchByLocation,
  houseId: state.auth.houseId,
  visitHouse: state.house.visitHouse,
  isSearched: state.product.isSearched
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarForm);
