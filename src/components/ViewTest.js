import { Button } from "@material-ui/core";
import { push } from "connected-react-router";
import React from "react";
import { connect } from "react-redux";
import useIsClassTeacher from "../hooks/useIsClassTeacher";
import _ from "lodash";

const ViewTest = props => {
  const testData = props.testData;
  const isClassTeacher = useIsClassTeacher({ redirect: false });
  const classId = props.match.params.classId;
  const testId = props.match.params.testId;
  console.log(isClassTeacher);

  return (
    <div className="w-1/2 mx-auto mt-4">
      <h2 className="text-xl">View Test</h2>
      <div>show data</div>
      {isClassTeacher === true
        ? _.map(testData.submissions, submission => <div>JSON.stringigy(submission)</div>)
        : null}
      {isClassTeacher === true ? (
        <Button
          onClick={() => {
            push(`/class/${classId}/test/${testId}/edit`);
          }}
          variant="contained"
          color="primary"
          className="mr-3">
          Email Sign Up
        </Button>
      ) : null}
      {isClassTeacher === false ? (
        <>
          <div>allow to submit</div>
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    auth: state.auth,
    classData: state.classes[ownProps.match.params.classId] ?? {},
    testData: state.tests[ownProps.match.params.testId] ?? {}
  };
};

export default connect(mapStateToProps, {})(ViewTest);
