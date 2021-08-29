import { push } from "connected-react-router";
import { SIGN_IN, SIGN_OUT, GAUTH_SIGN_IN, GAUTH_SIGN_OUT } from "../constants";
import { getGoogleID, tryGoogleSignOut } from "../gauth";

export const redirect = path => dispatch => {
  dispatch(push(path));
};

export const tryLocalSignIn = () => {
  return;
};

export const tryLocalSignOut = () => {
  return;
};

export const signOut = () => dispatch => {
  dispatch(redirect("/"));
  dispatch(tryGoogleSignOut);
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
