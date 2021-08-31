import { SNACKBAR_ERROR, SNACKBAR_SUCCESS, SNACKBAR_INFO, SNACKBAR_CLOSE } from "../constants";
const INITIAL_STATE = {
  // open: false,
  // message: "",
  // type: "error",
  snackPack: []
};

const snackBarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SNACKBAR_ERROR:
      return { snackPack: [...state.snackPack, { ...action.payload, type: "error" }] };
    case SNACKBAR_INFO:
      return { snackPack: [...state.snackPack, { ...action.payload, type: "info" }] };
    case SNACKBAR_SUCCESS:
      return { snackPack: [...state.snackPack, { ...action.payload, type: "success" }] };
    case SNACKBAR_CLOSE:
      return { snackPack: state.snackPack.slice(1) };
    default:
      return state;
  }
};

export default snackBarReducer;
