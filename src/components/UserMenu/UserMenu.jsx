import * as React from "react";
import isEmpty from "is-empty";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  fetchLoginStart,
  fetchLogoutStart,
} from "../../redux/auth/auth.actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import './UserMenu.css';

const UserMenu = ({ userName, logout, isLoggedIn, error }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [errors, setErrors] = React.useState(error);
  const open = Boolean(anchorEl);

  const classes = theme => ({
    menuItem: {
      border: '1px solid #ccc',
      padding: '0.5rem',
      borderRadius: '10px',
      margin: "0.5rem"
    }
    });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isEmpty(userName) && isLoggedIn) {
    userName = JSON.parse(localStorage.getItem("userData")).userName;
  }

  const logoutHandler = () => {
    logout();
    localStorage.removeItem("userData");
    localStorage.removeItem("visitHouse");

    if (isEmpty(errors)) {
      navigate("/login");
    } else {
      setErrors(error);
    }
  };

  return (
    <React.Fragment>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ color: "#aaa" }}
      >
        {userName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem className={{ root: classes.menuItem }}><Link to="/">My house</Link></MenuItem>
        <MenuItem className={{ root: classes.menuItem }}><Link to="/other-houses">Other houses</Link></MenuItem>
        <MenuItem className={{ root: classes.menuItem }} onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  userName: state.auth.userName,
  isLoggedIn: state.auth.isLoggedIn,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(fetchLogoutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
