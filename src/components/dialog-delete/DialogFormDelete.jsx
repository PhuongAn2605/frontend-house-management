import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Snackbar, Typography } from "@mui/material";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

import { DialogStyle, AddTextStyle } from "./DialogFormDelete.js";
import "./DialogFormDelete.css";

import { closeDialog, openDialog } from "../../redux/dialog/dialog-actions.js";
import { deleteProductStart } from "../../redux/product/product.actions.js";
import isEmpty from "is-empty";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            color: (theme) => theme.palette.grey[500],
          }}
          style={{ marginLeft: "auto"}}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const DialogFormDelete = ({ id, products, deleteProduct, errorFromState, message }) => {
  const productToDelete = products.find((p) => p._id === id);
  const [open, setOpenDialogEdit] = useState(false);

  const [noti, setNoti] = useState(null);
  const [openAlertDeleteSuccess, setOpenAlertDeleteSuccess] = useState(false);
  const [openAlertDeleteFailure, setOpenAlertDeleteFailure] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialogEdit(true);
  };
  const handleDialogDeleteClose = () => {
    setOpenDialogEdit(false);
  };

  const deleteProductHander = (e) => {
    if (!isEmpty(id)) {
      setTimeout(() => {
        deleteProduct(id);
      }, 1000);

      if (!isEmpty(errorFromState)) {
        setNoti("Deleting failed!");
        setOpenAlertDeleteFailure(true);
        setOpenAlertDeleteSuccess(false);
        handleDialogDeleteClose();

      } else {
        setNoti("Delete successfully!");
        setOpenAlertDeleteSuccess(true);
        setOpenAlertDeleteFailure(false);
        handleDialogDeleteClose();
      }
    }
  };

  const handleCloseDeleteAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertDeleteSuccess(false);
    setOpenAlertDeleteFailure(false);
  };

  return (
    <DialogStyle>
      <Button variant="outlined" onClick={handleDialogOpen}>
        <span>Delete</span>
      </Button>
      <BootstrapDialog
        onClose={handleDialogDeleteClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        scroll="body"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleDialogDeleteClose}
          style={{ display: "flex", alignItems: "center" }}
        >
          <AddTextStyle>Xác nhận xóa</AddTextStyle>
        </BootstrapDialogTitle>
        <DialogContent
          maxWidth="xl"
          style={{
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            justifyContent: "center",
          }}
          dividers
        >
          <div>
            <Typography
              gutterBottom
            >{`Xác nhận xóa ${productToDelete.productName}?`}</Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDialogDeleteClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={(e) => deleteProductHander(e)}>
            Confirm
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <Snackbar
        open={openAlertDeleteSuccess}
        autoHideDuration={3000}
        onClose={handleCloseDeleteAlert}
      >
        <Alert
          onClose={handleCloseDeleteAlert}
          severity="success"
          variant="filled"
          color="success"
          sx={{ width: "100%" }}
        >
          {noti}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAlertDeleteFailure}
        autoHideDuration={3000}
        onClose={handleCloseDeleteAlert}
        color="error"
      >
        <Alert
          onClose={handleCloseDeleteAlert}
          variant="filled"
          color="error"
          severity="error"
          sx={{ width: "100%" }}
        >
          {noti}
        </Alert>
      </Snackbar>
    </DialogStyle>
  );
};

const mapStateToProps = (state) => ({
  error: state.product.product,
  userName: state.auth.userName,
  productImage: state.product.productImage,
  openDialog: state.dialog.openDialog,
  products: state.product.products,
  errorFromState: state.product.error,
  message: state.product.message
});

const mapDispatchToProps = (dispatch) => ({
  closeDialogAction: () => dispatch(closeDialog()),
  openDialogAction: () => dispatch(openDialog()),
  deleteProduct: (id) => dispatch(deleteProductStart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogFormDelete);
