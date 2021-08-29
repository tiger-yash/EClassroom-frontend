import { SIGN_IN, SIGN_OUT, GAUTH_SIGN_IN, GAUTH_SIGN_OUT } from "../constants";
import Cookies from "js-cookie";

const INITIAL_STATE = {
  isSignedIn: Cookies.get("token") ? true : false,
  userToken: Cookies.get("token") || null,
  googleSignedIn: null,
  googleId: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userToken: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userToken: null };
    case GAUTH_SIGN_IN:
      return { ...state, isGoogleSignedIn: true, googleId: action.payload };
    case GAUTH_SIGN_OUT:
      return { ...state, isGoogleSignedIn: false, googleId: null };
    default:
      return state;
  }
};
export default authReducer;
