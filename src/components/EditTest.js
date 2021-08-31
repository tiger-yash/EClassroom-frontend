import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { editTest, fetchTest } from "../actions";
import RenderInput from "./RenderInput";
import RenderDate from "./RenderDate";
import Button from "@material-ui/core/Button";
import useIsClassTeacher from "../hooks/useIsClassTeacher";
import _ from "lodash";

const EditTest = props => {
  const { testData, classData, editTest, handleSubmit, submitting, change, fetchTest } = props;
  const [loaded, setLoaded] = useState(false);
  const testId = props.match.params.testId;
  const classId = props.match.params.classId;

  useIsClassTeacher({ redirect: true });
  useEffect(() => {
    if (!_.isEmpty(testData)) {
      if (!loaded) {
        change("test", testData.testName);
        change("url", testData.url);
        change("max_marks", testData.maxMarks);
        change("due_date", testData.dueDate);
        change("end_date", testData.endDate);
        setLoaded(true);
      }
    }
  }, [change, testData, loaded]);

  useEffect(() => {
    if (testId) {
      fetchTest(testId);
    }
  }, [fetchTest, testId]);

  const submitHandler = values => {
    console.log(values);
    editTest(classId, testId, { ...values, class_code: classData.classCode });
  };
  return (
    <div className="w-1/2 mx-auto mt-4">
      <h2 className="text-xl">Edit Test</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Field name="test" type="text" component={RenderInput} label="Test Name" />
        <Field name="url" type="text" component={RenderInput} label="Test Paper URL" />
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
    testData: state.tests[ownProps.match.params.testId] ?? {}
  };
};

export default connect(mapStateToProps, { fetchTest, editTest })(
  reduxForm({
    form: "editTest",
    validate
    // initialValues: {
    //   end_date: null,
    //   due_date: null
    // }
  })(EditTest)
);
