import React from "react";
import { connect } from "react-redux";
import useIsClassTeacher from "../hooks/useIsClassTeacher";

const ViewTest = props => {
  const isClassTeacher = useIsClassTeacher({ redirect: false });
  console.log(isClassTeacher);
  return (
    <div className="w-1/2 mx-auto mt-4">
      <h2 className="text-xl">View Test</h2>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    auth: state.auth,
    classData: state.classes[ownProps.match.params.classId],
    testData: state.tests[ownProps.match.params.testId]
  };
};

export default connect(mapStateToProps, {})(ViewTest);
