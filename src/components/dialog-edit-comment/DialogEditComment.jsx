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
import { styled } from "@mui/material/styles";
import { DialogStyle, AddTextStyle } from "../dialog-edit/DialogFormEdit.js";
import { Alert, Input, Snackbar, Typography } from "@mui/material";
import "./DialogEditComment.css";

import EditIcon from "@mui/icons-material/Edit";

import isEmpty from "is-empty";
import {
  editCommentStart,
  editReplyCommentStart,
} from "../../redux/comment/comment.actions.js";

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

let DialogEditComment = ({
  comment,
  editComment,
  editReplyComment,
  errorFromState,
  message,
  isReplied,
}) => {
  const { commenter, createdAt, content } = comment;
  const commentId = comment._id;

  const [contentValue, setContentValue] = useState(content && content);

  const [open, setOpenDialogEdit] = useState(false);
  const [noti, setNoti] = useState(null);
  const [openAlertEditSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertEditFailure, setOpenAlertFailure] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialogEdit(true);
  };
  const handleDialogClose = () => {
    setOpenDialogEdit(false);
  };

  const editCommentHandler = (e) => {
    e.preventDefault();

    if (!isReplied) {
      editComment(commentId, contentValue);
    } else {
      editReplyComment(commentId, contentValue);
    }
    if (!isEmpty(errorFromState) && isEmpty(message)) {
      setNoti("Update failed!");
      setOpenAlertFailure(true);
      setOpenAlertFailure(false);
      handleDialogClose();
    } else {
      setNoti("Update successfully!");
      setOpenAlertSuccess(true);
      setOpenAlertFailure(false);
      handleDialogClose();
    }
  };

  const handleCloseEditAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertSuccess(false);
    setOpenAlertFailure(false);
  };

  return (
    <DialogStyle>
      <EditIcon fontSize="small" color="action" onClick={handleDialogOpen} />
      <BootstrapDialog
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        scroll="body"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleDialogClose}
          style={{ display: "flex", alignItems: "center" }}
        >
          <AddTextStyle>Sửa bình luận </AddTextStyle>
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
          <form>
            <Typography gutterBottom>
              <Input
                id="Tên sản phẩm"
                name="productName"
                type="text"
                value={contentValue}
                onChange={(e) => setContentValue(e.currentTarget.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    editCommentHandler(e);
                  }
                }}
              />
            </Typography>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={(e) => editCommentHandler(e)}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <Snackbar
        open={openAlertEditSuccess}
        autoHideDuration={3000}
        onClose={handleCloseEditAlert}
      >
        <Alert
          onClose={handleCloseEditAlert}
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
        >
          {noti}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAlertEditFailure}
        autoHideDuration={3000}
        onClose={handleCloseEditAlert}
      >
        <Alert
          onClose={handleCloseEditAlert}
          variant="filled"
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
  errorFromState: state.house.error,
  message: state.house.message,
});

const mapDispatchToProps = (dispatch) => ({
  editComment: (commentId, content) =>
    dispatch(editCommentStart(commentId, content)),
  editReplyComment: (replyId, content) =>
    dispatch(editReplyCommentStart(replyId, content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogEditComment);
