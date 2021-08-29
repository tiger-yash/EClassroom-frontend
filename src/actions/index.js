import { push } from "connected-react-router";
import { SIGN_IN, SIGN_OUT, GAUTH_SIGN_IN, GAUTH_SIGN_OUT } from "../constants";
import { getGoogleID, tryGoogleSignOut } from "../gauth";
import Cookies from "js-cookie";

export const redirect = path => async dispatch => {
  // console.log(`redirecting to ${path}`);
  dispatch(push(path));
};

export const tryLocalSignIn = () => {
  return;
};

export const tryLocalSignOut = () => {
  return;
};

export const signOut = () => async dispatch => {
  await dispatch(redirect("/"));
  await tryGoogleSignOut();
  Cookies.remove("token");
  return dispatch({
    type: SIGN_OUT
  });
};

export const signIn = userToken => {
  if (userToken)
    return {
      type: SIGN_IN,
      payload: userToken
    };
};

//  stil not final
export const changeAuthGoogle = status => {
  if (status) {
    const googleID = getGoogleID();
    return {
      type: GAUTH_SIGN_IN,
      payload: googleID
    };
  } else {
    return {
      type: GAUTH_SIGN_OUT
    };
  }
};
