import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Box, Button, Container, Typography } from "@material-ui/core";
import useIsClassTeacher from "../hooks/useIsClassTeacher";
import { Link, useParams } from "react-router-dom";
import _ from "lodash";
import { fetchAllTests, fetchAllAssignments } from "../actions";
import RenderField from "./RenderField";

const RenderTest = props => {
  const { classId } = useParams();
  const { isTeacher, test } = props;

  return (
    <Box {...props} className="flex items-center my-2 bg-gray-300 p-2 rounded-md">
      <Link to={`/class/${classId}/test/${test.id}`}>
        <Typography component="h2" variant="subtitle1" className="text-lg">
          {test.testName}
        </Typography>
      </Link>
      {isTeacher ? (
        <Link to={`/class/${classId}/test/${test.id}/edit`} className="ml-auto">
          <Button variant="contained" color="secondary">
            Edit Test
          </Button>
        </Link>
      ) : null}
    </Box>
  );
};

const RenderAssignment = props => {
  const { classId } = useParams();
  const { isTeacher, assignment } = props;

  return (
    <Box {...props} className="flex items-center my-2 bg-gray-300 p-2 rounded-md">
      <Link to={`/class/${classId}/assignment/${assignment.id}`}>
        <Typography component="h2" variant="subtitle1" className="text-lg">
          {assignment.assignmentName}
        </Typography>
      </Link>
      {isTeacher ? (
        <Link to={`/class/${classId}/assignment/${assignment.id}/edit`} className="ml-auto">
          <Button variant="contained" color="secondary">
            Edit Assignment
          </Button>
        </Link>
      ) : null}
    </Box>
  );
};

const ClassView = props => {
  const { classData, tests, assignments, fetchAllAssignments, fetchAllTests } = props;
  const { subject, classCode, teacher } = classData;
  const classId = props.match.params.classId;
  const isClassTeacher = useIsClassTeacher({ redirect: false });

  useEffect(() => {
    if (classCode) fetchAllTests(classCode);
  }, [classCode, fetchAllTests]);

  useEffect(() => {
    if (classCode) fetchAllAssignments(classCode);
  }, [classCode, fetchAllAssignments]);

  return (
    <Container>
      <div className="mt-5">
        <Typography variant="h5" component="h2">
          Class Data
        </Typography>
        <div className="mx-3">
          {!_.isEmpty(classData) ? (
            <>
              <RenderField name="Subject" value={subject} />
              <RenderField name="Teacher" value={teacher} />
              <RenderField name="Class Code" value={classCode} />
            </>
          ) : null}
        </div>
      </div>
      <div className="mt-5">
        <div className="flex">
          <Typography variant="h5" component="h2">
            Assignments
          </Typography>

          {isClassTeacher === true ? (
            <Link to={`/class/${classId}/assignment/create`} className="ml-auto">
              <Button variant="contained" color="primary" className="w-60">
                Create New Assignment
              </Button>
            </Link>
          ) : null}
        </div>
        <div>
          {_.isEmpty(assignments) ? (
            <Typography variant="h6" component="h2">
              There are no assignments for this class yet.
            </Typography>
          ) : (
            <div className="mx-3">
              {_.map(tests, assignment => (
                <RenderAssignment
                  key={test.id}
                  assignment={assignment}
                  isTeacher={isClassTeacher}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-5 my-6">
        <div>
          <div className="flex flex-row">
            <Typography variant="h5" component="h2">
              Tests
            </Typography>
            {isClassTeacher === true ? (
              <Link to={`/class/${classId}/test/create`} className="ml-auto">
                <Button variant="contained" color="primary" className="w-60">
                  Create New Test
                </Button>
              </Link>
            ) : null}
          </div>

          <div>
            {_.isEmpty(tests) ? (
              <Typography variant="h6" component="h2">
                You have no tests for this class yet.
              </Typography>
            ) : (
              <div className="mx-3">
                {_.map(tests, test => (
                  <RenderTest key={test.id} test={test} isTeacher={isClassTeacher} />
                ))}
              </div>
            )}
          </div>
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
