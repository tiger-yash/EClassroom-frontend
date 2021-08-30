import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllClasses, fetchUserProfile } from "../actions";
import { push } from "connected-react-router";
import { TEACHER } from "../constants";
import ClassCard from "./ClassCard";
import NewClassCard from "./NewClassCard";
// import JoinClassCard from "./JoinClassCard";
// import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import _ from "lodash";

const ClassView = props => {
  const { push, auth, user, classes, fetchAllClasses, fetchUserProfile } = props;
  useEffect(() => {
    if (!auth.isSignedIn) {
      push("/login/");
    }
  }, [auth.isSignedIn, push]);

  useEffect(() => {
    if (!user.hasUserData) {
      fetchUserProfile();
    }
  }, [user.hasUserData, fetchUserProfile]);

  useEffect(() => {
    fetchAllClasses();
  }, [fetchAllClasses]);

  // const isStudent = () => user.role === STUDENT;
  const isTeacher = () => user.role === TEACHER;
  // console.log(isTeacher());
  // console.log(isStudent());
  // console.log(classes);

  return (
    <Grid container className="mt-3 mx-auto items-stretch" spacing={2}>
      {isTeacher() ? <NewClassCard /> : null}
      {/* {isStudent() ? <JoinClassCard /> : null} */}
      {classes.map(classData => (
        <ClassCard key={classData.id} classId={classData.id} />
      ))}
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    auth: _.clone(state.auth),
    user: _.clone(state.user),
    classes: _.map(state.classes, _.clone)
  };
};

export default connect(mapStateToProps, { fetchAllClasses, fetchUserProfile, push })(ClassView);
