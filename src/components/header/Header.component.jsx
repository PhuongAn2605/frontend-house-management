import { Button } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";

import { HeaderStyle, LeftHeaderItem, RightHeaderItem } from "./Header.styles";

const Header = ({ logout, isLoggedIn, isLogInMode, isSignupMode }) => {
  let activeStyle = {
    textDecoration: "underline",
  };

  return (
    <HeaderStyle className="header">
      <LeftHeaderItem>Home page</LeftHeaderItem>
      <RightHeaderItem>
        {!isLoggedIn ? (
          <NavLink
            to="/login"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Login /
          </NavLink>
        ) : (
          <NavLink
            to="/signup"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Sign up
          </NavLink>
        )}
      </RightHeaderItem>
    </HeaderStyle>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  isLogInMode: state.auth.isLogInMode,
  isSignupMode: state.auth.isSignupMode,
});

export default connect(mapStateToProps)(Header);
