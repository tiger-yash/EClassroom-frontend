import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { redirect, signIn } from "../actions";
import api from "../api";
import Cookies from "js-cookie";
import { getGoogleProfile, tryGoogleSignIn } from "../gauth";
import { LOCAL, GOOGLE } from "../constants";
import { Link } from "react-router-dom";
import "./Login.css";

const LoginForm = props => {
  const { isSignedIn, redirect, isGoogleSignedIn, handleSubmit, submitting, signIn } = props;
  const [toRedirect, setToRedirect] = useState(isSignedIn);
  useEffect(() => {
    (async () => {
      if (toRedirect) {
        await redirect("/loggedin");
        // will change the url to dashboard when that component is made
      }
    })();
  }, [toRedirect, redirect]);

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
                Cookies.set("token", token);
                signIn(token);
                setToRedirect(true);
              }
            })
            .catch(error => {
              if (error.response && error.response.data) console.log(error.response.data);
              console.log(error);
            });
        } catch (e) {
          console.log(e);
        }
      };
    }

    return (
      <button
        type="button"
        disabled={submitting}
        onClick={onClick}
        className="flex items-center py-1.5 px-3 rounded-md text-white"
        style={{ backgroundColor: "#de5246" }}>
        <i className="fab fa-google pr-2"></i>
        <p className="">Google LogIn</p>
      </button>
    );
  };

  const submitHandler = values => {
    api
      .post("/auth/login/", { ...values, mode: LOCAL })
      .then(async ({ data }) => {
        const { token } = data;
        if (token) {
          Cookies.set("token", token);
          signIn(token);
          setToRedirect(true);
        }
      })
      .catch(error => {
        if (error.response && error.response.data) console.log(error.response.data);
        console.log(error);
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
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center py-1.5 px-3 rounded-md text-white bg-blue-500 mr-3">
            <p className="">Login</p>
          </button>
          {renderGoogleAuthButton()}
        </div>
      </form>
      <Link to="/signup">
        <button className="my-3 rounded-md bg-gray-300 p-2">Don't have an account?</button>
      </Link>
    </div>
  );
};

const renderInput = ({ input, label, type, meta: { touched, error } }) => (
  <div className="mt-3">
    <label>
      <p>{label}</p>
      <div>
        <input
          {...input}
          placeholder={label}
          type={type}
          className={`${
            touched && error ? "border-red-500 border-2" : ""
          } bg-blue-300 text-white w-full p-2 mt-1.5`}
        />
        {touched && error && <span className="text-red-300">{error}</span>}
      </div>
    </label>
  </div>
);

const validate = values => {
  const errors = {};
  if (!values.username || values.username.trim() === "")
    errors.username = "Username cannot be blank";
  if (!values.password) errors.password = "Password cannot be blank";
  else if (values.password?.trim() === "") errors.password = "Password cannot contain only spaces";
  return errors;
};

const mapStateToProps = state => {
  return { ...state.auth };
};

export default reduxForm({
  form: "login",
  validate
})(
  connect(mapStateToProps, {
    redirect,
    signIn
  })(LoginForm)
);
