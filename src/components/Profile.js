import React, { useEffect } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { fetchUserProfile } from "../actions";
import RenderField from "./RenderField";

const Profile = props => {
  const { username, email, role, isSignedIn, push, fetchUserProfile } = props;
  useEffect(() => {
    if (!isSignedIn) push("/login");
  }, [isSignedIn, push]);
  useEffect(() => {
    fetchUserProfile();
  });

  return (
    <div>
      <RenderField name="Username" value={username} />
      <RenderField name="Email" value={email} />
      <RenderField name="Role" value={role} />
    </div>
  );
};

const mapStateToProps = state => {
  return { ...state.user, isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, {
  push,
  fetchUserProfile
})(Profile);
