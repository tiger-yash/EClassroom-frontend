import { changeAuthGoogle } from "./actions";
import { store } from "./index";

var GoogleAuth;
window.gapi.load("client:auth2", () => {
  window.gapi.client
    .init({
      clientId: "283109677525-sut6719vrbsn037uon8e29t7olc2qn50.apps.googleusercontent.com",
      scope: "email profile"
    })
    .then(() => {
      GoogleAuth = window.gapi.auth2.getAuthInstance();
      updateSigninStatus(GoogleAuth.isSignedIn.get());
      GoogleAuth.isSignedIn.listen(updateSigninStatus);
    });
});

const updateSigninStatus = status => store.dispatch(changeAuthGoogle(status));

const getGoogleID = () => GoogleAuth.currentUser.get().getBasicProfile().getId();

const tryGoogleSignIn = () => {
  return GoogleAuth.signIn();
};

const tryGoogleSignOut = () => {
  return GoogleAuth.signOut();
};

const getGoogleProfile = () => {
  return GoogleAuth.currentUser.get().getBasicProfile();
};

export {
  GoogleAuth,
  updateSigninStatus,
  getGoogleID,
  tryGoogleSignIn,
  tryGoogleSignOut,
  getGoogleProfile
};
