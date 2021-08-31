import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { createAssignment } from "../actions";
import RenderInput from "./RenderInput";
import RenderDate from "./RenderDate";
import Button from "@material-ui/core/Button";
import useIsClassTeacher from "../hooks/useIsClassTeacher";

const CreateAssignment = props => {
  const { createAssignment, handleSubmit, submitting } = props;
  const isClassTeacher = useIsClassTeacher({ redirect: true });
  console.log(isClassTeacher);

  return (
    <div className="w-1/2 mx-auto mt-4">
      <h2 className="text-xl">Create Assignment</h2>

      <form onSubmit={handleSubmit(createAssignment)}>
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
    classData: state.classes[ownProps.match.params.classId]
  };
};

export default connect(mapStateToProps, { createAssignment })(
  reduxForm({
    form: "createAssignment",
    validate
    // initialValues: {
    //   end_date: null,
    //   due_date: null
    // }
  })(CreateAssignment)
);
