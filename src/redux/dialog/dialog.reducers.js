import DialogTypes from "./dialog.types";

const INITIAL_STATE = {
  openDialog: false,
};

const dialogReducer = (state = INITIAL_STATE, action) => {
  switch (action) {
    case DialogTypes.OPEN_DIALOG:
      return {
        ...state,
        openDialog: true,
      };
    case DialogTypes.CLOSE_DIALOG:
      return {
        ...state,
        openDialog: false
      };
    default:
      return state;
  }
};

export default dialogReducer;
