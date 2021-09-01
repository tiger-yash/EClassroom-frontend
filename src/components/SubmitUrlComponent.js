import React from "react";
import { reduxForm, Field } from "redux-form";
// import { connect } from "react-redux";
import RenderInput from "./RenderInput";
import Button from "@material-ui/core/Button";

const SubmitUrlComponent = props => {
  const { handleSubmit, submitting } = props;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Field name="url" label="Submit URL" type="text" component={RenderInput} />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="mr-3"
          disabled={submitting}>
          Submit
        </Button>
      </form>
    </div>
  );
};

// const mapStateToProps = state => {
//   return {};
// };

const validate = values => {
  const errors = {};
  console.log(values);
  if (!values.url || values.url.trim() === "")
    errors.url = "You must provide a url for your submission";
  else if (
    !/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      values.url
    )
  )
    errors.url = "Not a valid Url";
  return errors;
};

// export default connect(
//   mapStateToProps,
//   {}
// )(reduxForm({ form: "submit-url", validate })(SubmitUrlComponent));

export default reduxForm({ form: "submit-url", validate })(SubmitUrlComponent);
