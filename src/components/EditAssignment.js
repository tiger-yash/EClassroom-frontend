import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { editAssignment, fetchAssignment } from "../actions";
import RenderInput from "./RenderInput";
import RenderDate from "./RenderDate";
import Button from "@material-ui/core/Button";
import useIsClassTeacher from "../hooks/useIsClassTeacher";
import _ from "lodash";

const EditAssignment = props => {
  const {
    assignmentData,
    classData,
    editAssignment,
    handleSubmit,
    submitting,
    change,
    fetchAssignment
  } = props;
  const assignmentId = props.match.params.assignmentId;
  const classId = props.match.params.classId;
  const [loaded, setLoaded] = useState(false);

  useIsClassTeacher({ redirect: true });
  useEffect(() => {
    if (!_.isEmpty(assignmentData)) {
      if (!loaded) {
        setLoaded(true);
        change("assignment", assignmentData.assignmentName);
        change("url", assignmentData.url);
        change("max_marks", assignmentData.maxMarks);
        change("due_date", assignmentData.dueDate);
        change("end_date", assignmentData.endDate);
      }
    }
  }, [change, assignmentData, loaded]);

  useEffect(() => {
    if (assignmentId && classData.classCode) {
      fetchAssignment(assignmentId);
    }
  }, [classData.classCode, fetchAssignment, assignmentId]);

  const submitHandler = values => {
    editAssignment(classId, assignmentId, { ...values, class_code: classData.classCode });
  };
  return (
    <div className="w-1/2 mx-auto mt-4">
      <h2 className="text-xl">Edit Assignment</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Field name="assignment" type="text" component={RenderInput} label="Assignment Name" />
        <Field name="url" type="text" component={RenderInput} label="Assignment Paper URL" />
        <Field name="max_marks" type="number" component={RenderInput} label="Max Marks" />
        <Field name="due_date" type="date" component={RenderDate} label="Due Date" />
        <Field name="end_date" type="date" component={RenderDate} label="End Date" />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="mr-3 mt-4"
          disabled={submitting}>
          <p className="">Submit</p>
        </Button>
      </form>
    </div>
  );
};

const validate = values => {
  const errors = {};
  // TODO:
  return errors;
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    auth: state.auth,
    classData: state.classes[ownProps.match.params.classId] ?? {},
    assignmentData: state.assignments[ownProps.match.params.assignmentId] ?? {}
  };
};

export default connect(mapStateToProps, { fetchAssignment, editAssignment })(
  reduxForm({
    form: "editAssignment",
    validate
    // initialValues: {
    //   end_date: null,
    //   due_date: null
    // }
  })(EditAssignment)
);
