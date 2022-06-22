import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { addProductImage } from "../../redux/product/product.actions";
import ButtonForm from "../button/Button.component";
import "./ImageUpload.styles.css";

const ErrorText = styled.div`
  color: red;
`;

const ImageUpload = ({
  id,
  center,
  onInput,
  productImage,
  addProductImage,
  imageUrl,

}) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(imageUrl);
  const [isValid, setIsValid] = useState();

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    addProductImage({ pickedFile });

    onInput(pickedFile);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <ButtonForm
          variant="contained"
          type="button"
          title="PICK IMAGE"
          action={() => pickImageHandler()}
          style={{ color: "#red", border: "1px solid #fff" }}
          color="primary"
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  productImage: state.product.productImage,
});

const mapDispatchToProps = (dispatch) => ({
  addProductImage: (url) => dispatch(addProductImage(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
