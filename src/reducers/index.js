import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { connectRouter } from "connected-react-router";
import history from "../history";
import authReducer from "./authReducer";

export default combineReducers({
  router: connectRouter(history),
  form: formReducer,
  auth: authReducer
});
