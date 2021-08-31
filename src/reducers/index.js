import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import routerReducer from "./routerReducer";
import classReducer from "./classReducer";
import testReducer from "./testReducer";
import assignmentReducer from "./assignmentReducer";
import snackBarReducer from "./snackBarReducer";

export default combineReducers({
  router: routerReducer,
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  classes: classReducer,
  tests: testReducer,
  assignments: assignmentReducer,
  snackBar: snackBarReducer
});
