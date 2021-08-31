import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import useIsClassTeacher from "../hooks/useIsClassTeacher";
import { fetchTest } from "../actions";
import { Link } from "react-router-dom";
import _ from "lodash";

const ViewTest = props => {
  const {
    testData: { dueDate, endDate, testName, maxMarks, url: testUrl },
    fetchTest
  } = props;
  const classId = props.match.params.classId;
  const testId = props.match.params.testId;
  const isClassTeacher = useIsClassTeacher({ redirect: false });

  useEffect(() => {
    if (testId) fetchTest(testId);
  }, [testId, fetchTest]);

  return (
    <div className="w-1/2 mx-auto mt-4">
      <div>
        <RenderField name="Test Name" value={testName} />
        <RenderField name="Max Marks" value={maxMarks} />
        <RenderField name="Test Paper" value={testUrl} />
        <RenderField name="Due Date" value={dueDate} />
        <RenderField name="Last Date" value={endDate} />
      </div>
      {isClassTeacher === true ? (
        <>
          <div>Submissions</div>
          {_.map(props.testData.submissions, submission => (
            <div>JSON.stringigy(submission)</div>
          ))}
        </>
      ) : null}
      {isClassTeacher === true ? (
        <Link to={`/class/${classId}/test/${testId}/edit`}>
          <Button variant="contained" color="primary" className="mr-3">
            Edit Test
          </Button>
        </Link>
      ) : null}
      {isClassTeacher === false ? (
        <>
          <div>allow to submit</div>
        </>
      ) : null}
    </div>
  );
};

const RenderField = props => {
  return (
    <div {...props}>
      <h2 className="text-xl ">{props.name}</h2>
      <p className="text-l">{props.value}</p>
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

export default connect(mapStateToProps, { fetchTest })(ViewTest);
