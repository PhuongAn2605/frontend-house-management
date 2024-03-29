import isEmpty from "is-empty";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";

import ImageUpload from "../input/ImageUpload.js";
import InputForm from "../input/Input.component.jsx";
import "./DialogFormAdd.css";
import { AddDialogStyle, AddTextStyle, DialogStyle } from "./DialogFormAdd.js";

import moment from "moment";
import Select from "react-select";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { closeDialog, openDialog } from "../../redux/dialog/dialog-actions.js";
import { addProductStart } from "../../redux/product/product.actions.js";
import { formProductValidation } from "../utils/formValidation.js";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, pristine, reset, submitting, ...others } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...others}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            color: (theme) => theme.palette.grey[500],
            marginLeft: "auto",
          }}
          style={{ marginLeft: "auto" }}
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

// const initialValues = {
//   expiration: moment(),
// }
const options = [
  { value: "Ngồi", label: "Ngồi" },
  { value: "Trang trí", label: "Trang trí" },
  { value: "Đựng đồ", label: "Đựng đồ" },
];
let DialogFormAdd = (props) => {
  const { addProduct, userName, productImage, initialValues } = props;
  const [open, setOpen] = useState(false);
  const [proName, setProName] = useState("");
  const [shortName, setShortName] = useState("");
  const [location, setLocation] = useState("");
  const [expiration, setExpiration] = useState(initialValues.expiration);
  const [functions, setFunctions] = useState(initialValues.functions);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(productImage);

  const [validExpiration, setValidExpiration] = useState(false);
  const [invalid, setInValid] = useState(true);

  useEffect(() => {
    props.initialize({
      initialValues,
    });
  }, [open]);

  useEffect(() => {
    if (
      !isEmpty(proName) &&
      !isEmpty(shortName) &&
      !isEmpty(location) &&
      !isEmpty(expiration) &&
      validExpiration
    ) {
      setInValid(false);
    } else {
      setInValid(true);
    }
  }, [proName, shortName, location, expiration, validExpiration]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setProName("");
    setShortName("");
    setLocation("");
    setExpiration(initialValues?.expiration);
    setFunctions(initialValues?.functions);
    setDescription("");
    setImage(null);
  };

  const inputHandler = (pickedFile) => {
    setImage(pickedFile);
  };
  const addProductHandler = (e) => {
    e.preventDefault();

    const product = {
      proName,
      shortName,
      location,
      expiration,
      functions,
      description,
      image,
    };
    const data = {
      product,
      userName,
    };

    setTimeout(() => {
      addProduct(data);
    }, 2000);
    // addProduct(data);

    handleClose();
    setProName("");
    setShortName("");
    setLocation("");
    setExpiration("");
    setFunctions("");
    setDescription("");
    setImage(null);

    // if (!isEmpty(errorFromState)) {
    //   setNoti("Adding failed!");
    //   setOpenAlertFailure(true);
    //   setOpenAlertSuccess(false);
    //   // handleClose();
    // } else {
    //   setNoti("Add successfully!");
    //   setOpenAlertSuccess(true);
    //   setOpenAlertFailure(false);
    //   // handleClose();
    // }
  };

  useEffect(() => {
    if (
      !isEmpty(expiration) &&
      moment(expiration).isBefore(moment()) &&
      moment(expiration).format("YYYY-MM-DD") !== moment().format("YYYY-MM-DD")
    ) {
      setValidExpiration(false);
    } else if (!isEmpty(expiration)) {
      setValidExpiration(true);
    }
  }, [expiration]);

  return (
    <DialogStyle>
      <Button variant="outlined" onClick={handleClickOpen}>
        <AddDialogStyle>
          <AddCircleOutlineOutlinedIcon sx={{ color: red[50] }} />
          <span>Thêm mới đồ vật</span>
        </AddDialogStyle>
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        scroll="body"
        fullWidth
        maxWidth="xl"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          style={{ display: "flex", alignItems: "center" }}
        >
          <AddTextStyle>Thêm mới đồ vật</AddTextStyle>
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Typography gutterBottom>
              <Field
                id="Tên sản phẩm"
                name="productName"
                component={InputForm}
                type="text"
                value={proName}
                onChange={(e) => setProName(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <Field
                id="Tên viết tắt"
                name="shortName"
                component={InputForm}
                type="text"
                value={shortName}
                onChange={(e) => setShortName(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <Field
                id="Vị trí đặt sản phẩm"
                name="location"
                component={InputForm}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <Field
                id="Hạn sử dụng sản phẩm"
                name="expiration"
                component={InputForm}
                type="date"
                value={expiration}
                onChange={(e) => setExpiration(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <Select
                options={options}
                defaultValue={options[0]}
                className="basic-single"
                classNamePrefix="select"
                name="functions"
                id="functions"
              />
              {/* <Box sx={{ maxWidth: 200 }} >
                <FormControl style={{ minWidth: 420 }} size="large">
                  <InputLabel id="demo-simple-select-label">
                    Chọn chức năng
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={functions}
                    label="Chọn chức năng"
                    onChange={(e) => setFunctions(e.target.value)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    <MenuItem value="Trang trí">Trang trí</MenuItem>
                    <MenuItem value="Ngồi">Ngồi</MenuItem>
                    <MenuItem value="Đựng đồ">Đựng đồ</MenuItem>
                  </Select>
                </FormControl>
              </Box> */}
            </Typography>

            <Typography gutterBottom>
              <Field
                id="Mô tả đồ vật"
                name="description"
                component={InputForm}
                type="textarea"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </Typography>
          </div>
          <Typography gutterBottom>
            <ImageUpload id="image" center="center" onInput={inputHandler} />
          </Typography>
        </DialogContent>
        {/* {!isEmpty(noti) && (
          <div style={{ color: "red", textAlign: "center" }}>{noti}</div>
        )} */}
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={(e) => addProductHandler(e)}
            disabled={invalid}
          >
            Add Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* use Snackbar to show notification */}
      {/* <Snackbar
        open={openAlertSuccess}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          color="success"
          sx={{ width: "100%" }}
        >
          {noti}
        </Alert>
      </Snackbar> */}
      {/* <Snackbar
        open={openAlertFailure}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        color="error"
      >
        <Alert
          onClose={handleCloseAlert}
          variant="filled"
          color="error"
          severity="error"
          sx={{ width: "100%" }}
        >
          {noti}
        </Alert>
      </Snackbar> */}
    </DialogStyle>
  );
};

const mapStateToProps = (state) => ({
  userName: state.auth.userName,
  productImage: state.product.productImage,
  openDialog: state.dialog.openDialog,
  errorFromState: state.product.error,
  message: state.product.message,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product, userName) =>
    dispatch(addProductStart(product, userName)),
  closeDialogAction: () => dispatch(closeDialog()),
  openDialogAction: () => dispatch(openDialog()),
});

DialogFormAdd = reduxForm({
  form: "dialogFormAdd",
  // destroyOnUnmount: false,
  validate: formProductValidation,
})(DialogFormAdd);

const selector = formValueSelector("dialogFormAdd");

DialogFormAdd = connect((state) => ({
  productName: selector(state, "productName"),
  shortName: selector(state, "shortName"),
  location: selector(state, "location"),
  expiration: selector(state, "expiration"),
  description: selector(state, "description"),
  // functions: selector(state, "functions"),
}))(DialogFormAdd);

export default connect(mapStateToProps, mapDispatchToProps)(DialogFormAdd);
