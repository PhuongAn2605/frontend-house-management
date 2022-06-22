import ProductTypes from "./product.types";
import { put, all, takeLatest, call } from "@redux-saga/core/effects";
import Http from "../../utils/http";
import {
  addProductSuccess,
  deleteProductSuccess,
  editProductSuccess,
  fetchFailure,
  fetchProductSuccess,
  getProductByIdSuccess,
  searchProductByLocationSuccess,
  searchProductByNameSuccess,
  searchProductFailure,
} from "./product.actions";
import axios from "axios";
import isEmpty from "is-empty";
import { toastError, toastSuccess } from "../../utils/ToastHelper/toastHelper";

export function* addProduct(payload) {
  const { product, userName } = payload.payload;
  const {
    proName,
    shortName,
    location,
    expiration,
    functions,
    description,
    image,
  } = product;

  try {
    const formData = new FormData();
    formData.append("productName", proName);
    formData.append("shortName", shortName);
    formData.append("location", location);
    formData.append("expiration", expiration);
    formData.append("functions", functions);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("houseId", null);

    const result = yield axios({
      method: "post",
      url: "http://localhost:5000/api/product/create/" + userName,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const data = result.data;
    if(result.status === 201) {
      yield put(addProductSuccess(data));
      toastSuccess(data.message);
    }
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

export function* addProductWatcher() {
  yield takeLatest(ProductTypes.ADD_PRODUCT_START, addProduct);
}

export function* fetchProduct(payload) {
  const userName  = payload.payload;
  try {
    const result = yield Http.get("/product/user/" + userName);
    const data = result.data;
    yield put(fetchProductSuccess(data.products));
  } catch (err) {
    console.log(err);
    yield put(fetchFailure(err));
  }
}

export function* fetchProductWatcher() {
  yield takeLatest(ProductTypes.FETCH_PRODUCTS_START, fetchProduct);
}

export function* editProduct(payload) {
  const product = payload.payload;
  const {
    proNameValue,
    shortNameValue,
    locationValue,
    expirationValue,
    functionsValue,
    descriptionValue,
    imageValue,
    id,
  } = product;

  try {
    const formData = new FormData();
    formData.append("productName", proNameValue);
    formData.append("shortName", shortNameValue);
    formData.append("location", locationValue);
    formData.append("expiration", expirationValue);
    formData.append("functions", functionsValue);
    formData.append("description", descriptionValue);
    formData.append("image", imageValue);
    formData.append("houseId", null);

    const result = yield axios({
      method: "patch",
      url: "http://localhost:5000/api/product/edit/" + id,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if(!isEmpty(result)){
      const data = result.data;
      yield put(editProductSuccess(data));
    }else{
      console.log('error');
    }
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

export function* editProductWatcher() {
  yield takeLatest(ProductTypes.EDIT_PRODUCT_START, editProduct);
}

export function* deleteProduct(payload) {
  const id = payload.payload;
  try {
    const result = Http.delete("/product/delete/" + id);

    const data = result.data;
    yield put(deleteProductSuccess(id));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}

export function* deleteProductWatcher() {
  yield takeLatest(ProductTypes.DELETE_PRODUCT_START, deleteProduct);
}


export function* searchProductByName (payload) {
  const productName = payload.payload.productName;
  const houseId = payload.payload.targetHouseId;
  try{
    const result = yield Http.post('/product/search-name/', {
    productName,
    houseId
    });

    const data = result.data;
    yield put(searchProductByNameSuccess(data));
  }catch(error){
    yield put(searchProductFailure(error));
  }
}

export function* searchProductByNameWatcher() {
  yield takeLatest(ProductTypes.SEARCH_PRODUCT_BY_NAME_START, searchProductByName);
}

export function* searchProductByLocation(payload) {
  const location = payload.payload.location;
  const houseId = payload.payload.targetHouseId;

  try{
    const result = yield Http.post('/product/search-location', {
    location,
    houseId
    });

    const data = result.data;
    yield put(searchProductByLocationSuccess(data));
  }catch(error){
    yield put(searchProductFailure(error));
  }
}

export function* searchProductByLocationWatcher() {
  yield takeLatest(ProductTypes.SEARCH_PRODUCT_BY_LOCATION_START, searchProductByLocation);
}

export function* getProductById(payload){
  const productId = payload.payload;
  try{
    const result = yield Http.get('/product/' + productId);
    const data = result.data;
    yield put(getProductByIdSuccess(data));
  }catch(err){
    yield put(fetchFailure(err));
  }
}

export function* getProductByIdWatcher(){
  yield takeLatest(ProductTypes.GET_PRODUCT_BY_ID_START, getProductById);
}

export function* productSaga() {
  yield all([
    call(addProductWatcher),
    call(fetchProductWatcher),
    call(editProductWatcher),
    call(deleteProductWatcher),
    call(searchProductByNameWatcher),
    call(searchProductByLocationWatcher),
    call(getProductByIdWatcher)
  ]);
}
