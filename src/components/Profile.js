import React, { useEffect } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { fetchUserProfile } from "../actions";
import RenderField from "./RenderField";
import { Box, Container } from "@material-ui/core";

const Profile = props => {
  const { username, email, role, isSignedIn, push, fetchUserProfile } = props;
  useEffect(() => {
    if (!isSignedIn) push("/login");
  }, [isSignedIn, push]);
  useEffect(() => {
    fetchUserProfile();
  });

  return (
    <Container>
      <Box my={2}>
        <RenderField name="Username" value={username} />
        <RenderField name="Email" value={email} />
        <RenderField name="Role" value={role} />
      </Box>
    </Container>
  );
};

const mapStateToProps = state => {
  return { ...state.user, isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, {
  push,
  fetchUserProfile
})(Profile);
