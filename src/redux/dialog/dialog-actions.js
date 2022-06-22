import DialogTypes from "./dialog.types";

export const openDialog = () => ({
    type: DialogTypes.OPEN_DIALOG
});

export const closeDialog = () => ({
    type: DialogTypes.CLOSE_DIALOG
});