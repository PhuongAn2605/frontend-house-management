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
import moment from "moment";
import { Field, formValueSelector, reduxForm } from "redux-form";

import InputForm from "../input/Input.component.jsx";
import { DialogStyle, AddTextStyle } from "./DialogFormEdit.js";
import { Alert, Input, Snackbar, Typography } from "@mui/material";
import ImageUpload from "../input/ImageUpload.js";
import "./DialogFormEdit.css";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import {
  addProductStart,
  editProductStart,
  getProductByIdStart,
} from "../../redux/product/product.actions.js";
import isEmpty from "is-empty";
import { closeDialog, openDialog } from "../../redux/dialog/dialog-actions.js";
import { formProductValidation } from "../utils/formValidation.js";
import Select from 'react-select';

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

const options = [
  { value: 'Ng???i', label: 'Ng???i' },
  { value: 'Trang tr??', label: 'Trang tr??' },
  { value: '????? ?????', label: '????? ?????' }
]

let DialogFormEdit = ({
  addProduct,
  userName,
  productImage,
  id,
  products,
  editProduct,
  getProductById,
  productReduxForm,
  errorFromState,
  message,
}) => {
  // let productName, shortName, location, expiration, description, image, functions;
  // let formatedExpiration;

  useEffect(() => {
    getProductById(id);
  }, [id]);

  let productToEdit;
  if (!isEmpty(products)) {
    productToEdit = products.filter((p) => p._id === id);
  }

  const {
    productName,
    shortName,
    location,
    image,
    houseId,
    functions,
    expiration,
    description,
  } = productToEdit[0];

  const formatedExpiration = new Date(expiration)
    .toISOString()
    .substring(0, 10);

  const [open, setOpenDialogEdit] = useState(false);
  const [noti, setNoti] = useState(null);
  const [proNameValue, setProName] = useState(productName && productName);
  const [shortNameValue, setShortName] = useState(shortName);
  const [locationValue, setLocation] = useState(location);
  const [expirationValue, setExpiration] = useState(formatedExpiration);
  const [functionsValue, setFunctions] = useState(functions);
  const [descriptionValue, setDescription] = useState(description);
  const [imageValue, setImage] = useState(image);
  const [openAlertEditSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertEditFailure, setOpenAlertFailure] = useState(false);
  const [editFunction, setEditFunction] = useState(functions);

  useEffect(() => {
    setEditFunction(options.find(opt => opt.value == functions)); 
  }, []);

  const handleDialogOpen = () => {
    setOpenDialogEdit(true);
  };
  const handleDialogClose = () => {
    setOpenDialogEdit(false);
  };

  const inputHandler = (pickedFile) => {
    setImage(pickedFile);
  };

  const editProductHander = (e) => {
    e.preventDefault();

    const product = {
      proNameValue,
      shortNameValue,
      locationValue,
      expirationValue,
      functionsValue,
      descriptionValue,
      imageValue,
      id,
    };

    editProduct(product);

    if (!isEmpty(errorFromState)) {
      setNoti("Update failed!");
      setOpenAlertFailure(true);
      setOpenAlertFailure(false);
      handleDialogClose();
    } else if (isEmpty(errorFromState) && !isEmpty(message)) {
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
      <Button variant="outlined" onClick={handleDialogOpen}>
        <span>Edit</span>
      </Button>
      <BootstrapDialog
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        scroll="body"
        fullWidth
        maxWidth="xl"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleDialogClose}
          style={{ display: "flex", alignItems: "center" }}
        >
          <AddTextStyle>S???a th??ng tin s???n ph???m</AddTextStyle>
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
              <Field
                id="T??n s???n ph???m"
                name="productName"
                component={InputForm}
                type="text"
                value={proNameValue}
                onChange={(e) => setProName(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <Field
                id="T??n vi???t t???t"
                name="shortName"
                component={InputForm}
                type="text"
                value={shortNameValue}
                onChange={(e) => setShortName(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <Field
                id="V??? tr?? ?????t s???n ph???m"
                name="location"
                component={InputForm}
                type="text"
                value={locationValue}
                onChange={(e) => setLocation(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <Field
                id="H???n s??? d???ng s???n ph???m"
                name="expiration"
                component={InputForm}
                type="date"
                value={expirationValue}
                onChange={(e) => setExpiration(e.currentTarget.value)}
              />
            </Typography>
            <Typography gutterBottom>
            <Select 
                  options={options}
                  defaultValue={editFunction}
                  className="basic-single"
                  classNamePrefix="select"
                  name="functions"
                  id="functions"
                  />
              {/* <Box sx={{ maxWidth: 200 }} style={{ margin: "auto" }}>
                <FormControl style={{ minWidth: 420 }} size="large">
                  <InputLabel id="demo-simple-select-label">
                    Ch???n ch???c n??ng
                  </InputLabel> */}
                  
                  {/* <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={functionsValue}
                    label="Ch???n ch???c n??ng"
                    onChange={(e) => setFunctions(e.target.value)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    {functionsValue == "Trang tr??" ? (
                      <MenuItem value={"Trang tr??"} selected>
                        Trang tr??
                      </MenuItem>
                    ) : (
                      <MenuItem value={"Trang tr??"}>Trang tr??</MenuItem>
                    )}
                    {functionsValue == "Ng???i" ? (
                      <MenuItem value={"Ng???i"} selected>
                        Ng???i
                      </MenuItem>
                    ) : (
                      <MenuItem value={"Ng???i"}>Ng???i</MenuItem>
                    )}
                    {functionsValue == "?????ng ?????" ? (
                      <MenuItem value={"?????ng ?????"} selected>
                        ?????ng ?????
                      </MenuItem>
                    ) : (
                      <MenuItem value={"?????ng ?????"}>?????ng ?????</MenuItem>
                    )}
                  </Select> */}
                {/* </FormControl>
              </Box> */}
            </Typography>

            <Typography gutterBottom>
              <Field
                id="M?? t??? ????? v???t"
                name="description"
                component={InputForm}
                type="text"
                value={descriptionValue}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </Typography>
          </form>
          <Typography gutterBottom>
            <ImageUpload
              id="image"
              center="center"
              onInput={inputHandler}
              imageUrl={`https://backend-house-management.herokuapp.com/${imageValue}`}
            />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={(e) => editProductHander(e)}>
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
  error: state.product.product,
  userName: state.auth.userName,
  productImage: state.product.productImage,
  openDialog: state.dialog.openDialog,
  products: state.product.products,
  productToEdit: state.product.productToEdit,
  errorFromState: state.product.error,
  message: state.product.message,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product, userName) =>
    dispatch(addProductStart(product, userName)),
  closeDialogAction: () => dispatch(closeDialog()),
  openDialogAction: () => dispatch(openDialog()),
  editProduct: (product) => dispatch(editProductStart(product)),
  getProductById: (productId) => dispatch(getProductByIdStart(productId)),
});

DialogFormEdit = reduxForm({
  form: "dialogFormEdit",
  // enableReinitialize: true,
  // destroyOnUnmount: false,
  validate: formProductValidation,
})(DialogFormEdit);

const editSelector = formValueSelector("dialogFormEdit");
DialogFormEdit = connect((state) => {
  const productReduxForm = editSelector(
    state,
    "productName",
    "shortName",
    "location",
    "expiration",
    "description"
  );
  const editProduct = state.product.productToEdit;

  return {
    initialValues: !isEmpty(editProduct) && {
      productName: editProduct.productName,
      // productName: "Test",
      shortName: editProduct.shortName,
      location: editProduct.location,
      expiration: moment(editProduct.expiration).format("yyyy-MM-DD"),
      description: editProduct.description,
    },
    productReduxForm,
  };
})(DialogFormEdit);

export default connect(mapStateToProps, mapDispatchToProps)(DialogFormEdit);
