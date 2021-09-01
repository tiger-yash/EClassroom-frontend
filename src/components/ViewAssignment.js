import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import useIsClassTeacher from "../hooks/useIsClassTeacher";
import { fetchAssignment } from "../actions";
import { Link } from "react-router-dom";
import _ from "lodash";
import SubmitUrlComponent from "./SubmitUrlComponent";
import RenderField from "./RenderField";

const ViewAssignment = props => {
  const {
    assignmentData: { dueDate, endDate, assignmentName, maxMarks, url: assignmentUrl },
    fetchAssignment
  } = props;
  const classId = props.match.params.classId;
  const assignmentId = props.match.params.assignmentId;
  const isClassTeacher = useIsClassTeacher({ redirect: false });

  useEffect(() => {
    if (assignmentId) fetchAssignment(assignmentId);
  }, [assignmentId, fetchAssignment]);

  return (
    <div className="w-1/2 mx-auto mt-4">
      <div>
        <RenderField name="Assignment Name" value={assignmentName} />
        <RenderField name="Max Marks" value={maxMarks} />
        <RenderField name="Assignment Paper" value={assignmentUrl} />
        <RenderField name="Due Date" value={dueDate} />
        <RenderField name="Last Date" value={endDate} />
      </div>
      {isClassTeacher === true ? (
        <>
          <div>Submissions</div>
          {_.map(props.assignmentData.submissions, submission => (
            <div>JSON.stringigy(submission)</div>
          ))}
        </>
      ) : null}
      {isClassTeacher === true ? (
        <Link to={`/class/${classId}/assignment/${assignmentId}/edit`}>
          <Button variant="contained" color="primary" className="mr-3">
            Edit Assignment
          </Button>
        </Link>
      ) : null}
      {isClassTeacher === false ? (
        <SubmitUrlComponent
          onSubmit={values => {
            console.log("Still working on the submission");
          }}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    auth: state.auth,
    classData: state.classes[ownProps.match.params.classId] ?? {},
    assignmentData: state.assignments[ownProps.match.params.assignmentId] ?? {}
  };
};

export default connect(mapStateToProps, { fetchAssignment })(ViewAssignment);
