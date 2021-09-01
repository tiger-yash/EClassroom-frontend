import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Container, Typography } from "@material-ui/core";
import useIsClassTeacher from "../hooks/useIsClassTeacher";
import { Link } from "react-router-dom";
import _ from "lodash";
import { fetchAllTests, fetchAllAssignments } from "../actions";
import RenderField from "./RenderField";

const ClassView = props => {
  const { classData, tests, assignments, fetchAllAssignments, fetchAllTests } = props;
  const classId = props.match.params.classId;
  const isClassTeacher = useIsClassTeacher({ redirect: false });

  useEffect(() => {
    if (classId) fetchAllTests(classId);
  }, [classId, fetchAllTests]);

  useEffect(() => {
    if (classId) fetchAllAssignments(classId);
  }, [classId, fetchAllAssignments]);

  console.log(classData);
  return (
    <Container>
      <div>
        <Typography variant="h5" component="h2">
          Class Data
        </Typography>
        <div className="mx-3">
          {!_.isEmpty(classData) ? (
            <>
              <RenderField name="Subject" value={classData.subject} />
              <RenderField name="Teacher" value={classData.teacher} />
              <RenderField name="Class Code" value={classData.classCode} />
            </>
          ) : null}
        </div>
      </div>
      <div>
        <Typography variant="h5" component="h2">
          Assignments
        </Typography>
        <div>
          {isClassTeacher === true ? (
            <Link to={`/class/${classId}/assignment/create`}>
              <Button variant="contained" color="primary" className="mr-3">
                Create New Assignment
              </Button>
            </Link>
          ) : null}
        </div>
      </div>
      <div>
        <Typography variant="h5" component="h2">
          Tests
        </Typography>
        <div>
          {isClassTeacher === true ? (
            <Link to={`/class/${classId}/test/create`}>
              <Button variant="contained" color="primary" className="mr-3">
                Create New Test
              </Button>
            </Link>
          ) : null}
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    classData: state.classes[ownProps.match.params.classId] ?? {},
    tests: state.tests,
    assignments: state.assignments
  };
};

export default connect(mapStateToProps, { fetchAllAssignments, fetchAllTests })(ClassView);
