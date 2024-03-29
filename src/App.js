import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Login from "./pages/auth/login.page";
import Signup from "./pages/auth/signup.page";
import MyHome from "./pages/my-home";
import OtherHousePage from "./pages/other-houses";
import {
  fetchLoginStart, fetchLogoutStart
} from "./redux/auth/auth.actions";
import { fetchProductStart } from "./redux/product/product.actions";

let logoutTimer;
const App = ({
  login,
  logout,
  token,
  tokenExpirationDate,
  isLoggedIn,
  fetchProducts,
  products,
  targetProducts,
  targetComments,
  visitHouse,
  authComments,
  tokenFromState,
}) => {

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userName,
        storedData.password,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <MyHome products={products} visit={false} />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/other-houses" element={<OtherHousePage />} />
        <Route
          path="/visit-house/:houseId"
          element={
            targetProducts && <MyHome products={targetProducts} visit={true} />
          }
        />
      </Routes>
      <ToastContainer hideProgressBar position="top-right" transition={Slide} />

    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (userName, password, token, expirationDate) =>
    dispatch(fetchLoginStart(userName, password, token, expirationDate)),
  logout: () => dispatch(fetchLogoutStart()),
  fetchProducts: () => dispatch(fetchProductStart()),
});

const mapStateToProps = (state) => ({
  token: state.auth.token,
  tokenExpirationDate: state.auth.tokenExpirationDate,
  isLoggedIn: state.auth.isLoggedIn,
  products: state.product.products,
  targetProducts: state.house.targetProducts,
  targetComments: state.house.targetComments,
  visitHouse: state.house.visitHouse,
  authComments: state.auth.comments,
  tokenFromState: state.auth.token,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
