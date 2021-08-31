import React, { useEffect } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { createTest } from "../actions";
import { push } from "connected-react-router";
import { fetchClass } from "../actions";
import RenderInput from "./RenderInput";
import RenderDate from "./RenderDate";
import Button from "@material-ui/core/Button";

const CreateTest = props => {
  const { user, classData, auth, push, createTest, handleSubmit, submitting, fetchClass } = props;

  // useEffect(() => {
  //   if (!user.isTeacher) push("/classes/");
  // }, [user.isTeacher, push]);
  useEffect(() => {
    fetchClass(props.match.params.classId);
  }, [fetchClass, props.match.params.classId]);

  useEffect(() => {
    if (user.username && classData && classData.teacher && user.username !== classData.teacher) {
      push("/class/");
    }
  }, [classData, user.username, push]);

  useEffect(() => {
    console.log(auth.isSignedIn);
    if (!auth.isSignedIn) push("/login/");
  }, [auth.isSignedIn, push]);

  return (
    <div className="w-1/2 mx-auto mt-4">
      <h2 className="text-xl">Create Test</h2>

      <form onSubmit={handleSubmit(createTest)}>
        <Field name="test_name" type="text" component={RenderInput} label="Test Name" />
        <Field name="paper_url" type="text" component={RenderInput} label="Test Paper URL" />
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

export default connect(mapStateToProps, { createTest, push, fetchClass })(
  reduxForm({
    form: "createTest",
    validate
    // initialValues: {
    //   end_date: null,
    //   due_date: null
    // }
  })(CreateTest)
);
