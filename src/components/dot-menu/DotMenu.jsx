import React from "react";
import { connect } from "react-redux";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import './DotMenu.css';
import styled from "styled-components";
import DialogFormEdit from "../dialog-edit/DialogFormEdit.jsx";
import { deleteProductStart } from "../../redux/product/product.actions";
import DialogFormDelete from "../dialog-delete/DialogFormDelete.jsx";

const DotMenuStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  margin: 0;
`

const DotMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <DotMenuStyle>
      <div
        id={props.id}
        aria-controls={open ? "demo-positioned-menu" + props.id : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </div>
      <Menu
        id={"demo-positioned-menu" + props.id}
        aria-labelledby={props.id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem ><DialogFormEdit id={props.id} /></MenuItem>
        <MenuItem><DialogFormDelete id={props.id} /></MenuItem>
      </Menu>
    </DotMenuStyle>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteProduct: (id) => dispatch(deleteProductStart(id))
})

export default connect(null, mapDispatchToProps)(DotMenu);
