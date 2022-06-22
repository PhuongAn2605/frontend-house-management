import { Typography } from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { toast } from 'react-toastify';
import iconToastSuccess from "../../images/iconToastSuccess.svg";
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

const optionErrors = {
  autoClose: 2000,
  className: 'toast-error-container toast-error-container-after',
};
const optionSuccess = {
  autoClose: 2000,
  className: 'toast-success-container toast-success-container-after',
};
const optionWarning = {
  autoClose: 2000,
  className: 'toast-warning-container toast-warning-container-after',
};

const ViewToast = (props) => {
  <div style={{ display: 'flex', alignItems: 'cecnter' }}>
    {props.children}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'left'
    }}>
      <Typography style={{
        fontSize: 15,
        color: 'green',
        fontWeight: 600
      }}
      >
        {props.message}
      </Typography>
    </div>
  </div>
}

export const toastError = (error) => {
  let message = null;
  if(typeof error === 'object' && error.message) {
    ({ message } = error);
  }
  if(message !== null && typeof message !== 'undefined') {
    toast.error(
      <ViewToast
        title="Failed"
        message={message}
      >
        <CancelOutlinedIcon
        fontSize="large"
        style={{
          color: "pink",
          margin: '0px 15px 0px 10px'
        }}
        />
      </ViewToast>,
      optionErrors
    )
  }
};

export const toastSuccess = (message) => {
  if(message !== null && typeof message !== 'undefined') {
    toast.error(
      <ViewToast
      title="Success"
      message={message}
      >
        <img
          src={iconToastSuccess}
          alt="success"
          style={{ margin: '0px 15px 0px 10px' }}
        />
      </ViewToast>,
      optionSuccess
    )
  }
}

export const toastWarning = (warning) => {
  let message = null;
  if (typeof warning === 'object' && warning.message) {
      ({ message } = warning);
  }
  if (message !== null && typeof message !== 'undefined') {
      toast.warning(
          <ViewToast
              title="cảnh báo"
              message={message}
          >
              <ErrorOutlineOutlinedIcon
                  fontSize="large"
                  style={{
                      color: 'gold',
                      margin: '0px 15px 0px 10px',
                  }}
              />
          </ViewToast>,
          optionWarning,
      );
  }
};
