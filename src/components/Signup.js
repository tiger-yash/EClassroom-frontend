import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { push } from "connected-react-router";
import { signIn, snackBarError } from "../actions";
import api from "../api";
import { getGoogleProfile, tryGoogleSignIn } from "../gauth";
import { LOCAL, GOOGLE, STUDENT, TEACHER } from "../constants";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import renderInput from "./RenderInput";
import renderSelect from "./RenderSelect";
import _ from "lodash";

let SignUpForm = props => {
  const { push, isGoogleSignedIn, handleSubmit, submitting, signIn, snackBarError, change } = props;
  const [authMethod, setAuthMethod] = useState(LOCAL);
  const [toRedirect, setToRedirect] = useState(false);

  useEffect(() => {
    if (toRedirect) {
      push("/class");
    }
  }, [toRedirect, push]);

  // useEffect(() => {
  //   if (isGoogleSignedIn === false) setAuthMethod(LOCAL);
  // }, [isGoogleSignedIn]);

  const renderGoogleAuthButton = () => {
    let onClick = null;
    if (isGoogleSignedIn !== null) {
      onClick = async () => {
        try {
          await tryGoogleSignIn();
          setAuthMethod(GOOGLE);
          const profile = getGoogleProfile();
          change("email", profile.getEmail());
          change("username", profile.getName());
        } catch (e) {
          console.log(e);
          if (e.error && e.error === "pop_up_closed_by_user") {
            return;
          } else {
            snackBarError(e.message);
          }
        }
      };
    }

    return (
      <Button
        type="button"
        variant="contained"
        disabled={submitting}
        onClick={onClick}
        className="flex items-center text-white mr-3"
        style={{ backgroundColor: "#de5246" }}>
        <i className="fab fa-google pr-2"></i>
        <p className="">Google SignUp</p>
      </Button>
    );
  };

  const submitHandler = async values => {
    if (authMethod === GOOGLE) return googleSignUpSubmit(values);
    else return localSignUpSubmit(values);
  };

  const localSignUpSubmit = values => {
    const submitValues = {
      username: values.username,
      password: values.password,
      email: values.email,
      is_student: values.role === STUDENT,
      is_teacher: values.role === TEACHER,
      mode: "local"
    };

    return api
      .post("/auth/register/", submitValues)
      .then(({ data }) => {
        const { token } = data;
        if (token) {
          signIn(token);
          setToRedirect(true);
        }
      })
      .catch(error => {
        if (error.response && error.response.data && !_.isEmpty(error)) {
          snackBarError(_.first(_.map(error.response.data, _.first)));
        } else snackBarError(error.message);
      });
  };

  const googleSignUpSubmit = values => {
    const profile = getGoogleProfile();
    const submitValues = {
      username: values.username,
      email: profile.getEmail(),
      g_token: profile.getId(),
      is_student: values.role === STUDENT,
      is_teacher: values.role === TEACHER,
      mode: "google"
    };

    return api
      .post("/auth/register/", submitValues)
      .then(({ data }) => {
        const { token } = data;
        if (token) {
          signIn(token);
          setToRedirect(true);
        }
      })
      .catch(error => {
        if (error.response && error.response.data && !_.isEmpty(error)) {
          snackBarError(_.first(_.map(error.response.data, _.first)));
        } else snackBarError(error.message);
      });
  };

  const renderLocalFormFields = () => {
    if (authMethod === LOCAL) return <LocalSignUpFormFields />;
  };

  return (
    <>
      <div className="w-1/2 mx-auto mt-4">
        <form onSubmit={handleSubmit(submitHandler)} className="signup-form">
          <h2 className="text-xl">SignUp Form</h2>

          <Field name="username" type="text" component={renderInput} label="Username" />
          {renderLocalFormFields()}

          <Field
            name="role"
            component={renderSelect}
            options={["", STUDENT, TEACHER]}
            label="Role"
          />
          <div className="flex mt-3">
            <Button
              onClick={() => {
                setAuthMethod(LOCAL);
              }}
              variant="contained"
              color="primary"
              className="mr-3"
              disabled={submitting}>
              Email Sign Up
            </Button>
            {renderGoogleAuthButton()}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="bg-green-500 hover:bg-green-500 active:bg-green-500"
              disabled={submitting}>
              Submit
            </Button>
          </div>
        </form>
        <Link to="/login">
          <Button variant="contained" className="my-5">
            Already have an account?
          </Button>
        </Link>
      </div>
    </>
  );
};

const LocalSignUpFormFields = props => {
  return (
    <>
      <Field name="email" type="email" label="E-mail" component={renderInput} />
      <Field name="password" type="password" component={renderInput} label="Password" />
      <Field name="password_re" type="password" component={renderInput} label="Confirm Password" />
    </>
  );
};

const validate = values => {
  const errors = {};
  if (!values.username || values.username.trim() === "")
    errors.username = "Username cannot be blank";
  if (!values.password) errors.password = "Password cannot be blank";
  else if (values.password?.trim() === "") errors.password = "Password cannot contain only spaces";
  if (values.password !== values.password_re) {
    errors.password = "Passwords do not match";
    errors.password_re = "Passwords do not match";
  }
  if (!values.password_re) errors.password_re = "You must enter your password again.";

  if (!values.email || values.email.trim() === "") errors.email = "Email cannot be blank";
  else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.email))
    errors.email = "Not a valid Email";
  if (!values.role || ![STUDENT, TEACHER].includes(values.role)) errors.role = "Select a Role";
  return errors;
};

const mapStateToProps = state => {
  return { ...state.auth };
};

SignUpForm = reduxForm({
  form: "signup",
  validate
})(SignUpForm);

SignUpForm = connect(mapStateToProps, {
  push,
  signIn,
  snackBarError
})(SignUpForm);

export default SignUpForm;
