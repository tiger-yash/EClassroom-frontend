import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { push } from "connected-react-router";
import { signIn, snackBarError } from "../actions";
import api from "../api";
import { getGoogleProfile, tryGoogleSignIn } from "../gauth";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import renderInput from "./RenderInput";
import _ from "lodash";

let LoginForm = props => {
  const { isSignedIn, push, isGoogleSignedIn, handleSubmit, submitting, signIn, snackBarError } =
    props;
  const [toRedirect, setToRedirect] = useState(isSignedIn);
  useEffect(() => {
    if (toRedirect) {
      push("/class");
    }
  }, [toRedirect, push]);

  const renderGoogleAuthButton = () => {
    let onClick = null;
    if (isGoogleSignedIn !== null) {
      onClick = async () => {
        try {
          await tryGoogleSignIn();
          const profile = getGoogleProfile();
          api
            .post("/auth/login/", {
              g_token: profile.getId(),
              mode: "google",
              username: "aditya"
            })
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
        } catch (e) {
          console.log(e);
          if (e.error && e.error === "pop_up_closed_by_user") return;
          snackBarError(e.message);
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
        <p className="">Google LogIn</p>
      </Button>
    );
  };

  const submitHandler = values => {
    console.log(values);
    api
      .post("/auth/login/", { ...values, mode: "local" })
      .then(async ({ data }) => {
        const { token } = data;
        if (token) {
          signIn(token);
          setToRedirect(true);
        }
      })
      .catch(error => {
        if (error.response && error.response.data && !_.isEmpty(error.response.data)) {
          snackBarError(_.first(_.map(error.response.data, _.first)));
          return console.log(error.response.data);
        }
        console.log(error);
        snackBarError(error.message);
      });
  };

  const renderFormFields = () => {
    return (
      <>
        <Field name="username" type="text" component={renderInput} label="Username" />
        <Field name="password" type="password" component={renderInput} label="Password" />
      </>
    );
  };

  return (
    <div className="w-1/2 mx-auto mt-4">
      <h2 className="text-xl">LogIn Form</h2>
      <form onSubmit={handleSubmit(submitHandler)} className="login-form ">
        {renderFormFields()}
        <div className="flex mt-3">
          {renderGoogleAuthButton()}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="mr-3"
            disabled={submitting}>
            <p className="">Submit</p>
          </Button>
        </div>
      </form>
      <Link to="/signup">
        <Button variant="contained" className="my-5 ">
          Don't have an account?
        </Button>
      </Link>
    </div>
  );
};

const validate = values => {
  const errors = {};
  if (values.username === undefined || !values.username || values.username.trim() === "")
    errors.username = "Username cannot be blank";
  if (values.password === undefined || !values.password)
    errors.password = "Password cannot be blank";
  else if (values.password?.trim() === "") errors.password = "Password cannot contain only spaces";
  return errors;
};

const mapStateToProps = state => {
  return { ...state.auth };
};

LoginForm = reduxForm({
  form: "login",
  validate
})(LoginForm);

export default connect(mapStateToProps, {
  push,
  signIn,
  snackBarError
})(LoginForm);
