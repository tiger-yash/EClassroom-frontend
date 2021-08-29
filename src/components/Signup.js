import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { redirect, signIn } from "../actions";
import api from "../api";
import Cookies from "js-cookie";
import { getGoogleProfile, tryGoogleSignIn } from "../gauth";
import { LOCAL, GOOGLE, STUDENT, TEACHER } from "../constants";
import { Link } from "react-router-dom";
import "./Signup.css";

const SignUpForm = props => {
  const { redirect, isGoogleSignedIn, handleSubmit, submitting, signIn } = props;
  const [authMethod, setAuthMethod] = useState(LOCAL);
  const [toRedirect, setToRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      if (toRedirect) {
        await redirect("/loggedin");
        // will change the url to dashboard when that component is made
      }
    })();
  }, [toRedirect, redirect]);
  // useEffect(() => {
  //   if (isGoogleSignedIn === false) setAuthMethod(LOCAL);
  // }, []);

  const renderGoogleAuthButton = () => {
    let onClick = null;
    if (isGoogleSignedIn !== null) {
      onClick = async () => {
        try {
          await tryGoogleSignIn();
          setAuthMethod(GOOGLE);
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
        <p className="">Google SignUp</p>
      </button>
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
    if (authMethod === LOCAL) return <LocalSignUpFormFields />;
    else return <GoogleSignUpFormFields />;
  };

  return (
    <div className="w-1/2 mx-auto mt-4">
      <div className="flex mt-3 my-6">
        <button
          onClick={() => setAuthMethod(LOCAL)}
          className="flex items-center py-1.5 px-3 rounded-md text-white bg-blue-500 mr-3">
          <p className="">Username Sign Up</p>
        </button>
        {renderGoogleAuthButton()}
      </div>
      <form onSubmit={handleSubmit(submitHandler)} className="signup-form">
        {renderFormFields()}
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center py-1.5 px-3 rounded-md mt-4 text-white bg-green-500">
          <p className="">Sign Up</p>
        </button>
      </form>
      <Link to="/login">
        <button className="my-3 rounded-md bg-gray-300 p-2">Already have an account?</button>
      </Link>
    </div>
  );
};

const renderSelect = ({ input, options, label, type, meta: { touched, error } }) => (
  <div className="mt-3">
    <label>
      <p>{label}</p>
      <div>
        <select
          {...input}
          placeholder={label}
          className={`${
            touched && error ? "border-red-500 border-2" : ""
          } bg-blue-300 text-white w-full p-2 mt-1.5`}>
          {options.map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
        {touched && error && <span className="text-red-300">{error}</span>}
      </div>
    </label>
  </div>
);
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

const LocalSignUpFormFields = props => {
  return (
    <>
      <Field name="username" type="text" component={renderInput} label="Username" />
      <Field name="email" type="email" label="E-mail" component={renderInput} />
      <Field name="password" type="password" component={renderInput} label="Password" />
      <Field name="password_re" type="password" component={renderInput} label="Confirm Password" />
      <Field
        name="role"
        component={renderSelect}
        options={[STUDENT, TEACHER]}
        label="Student/Teacher"
      />
    </>
  );
};

const GoogleSignUpFormFields = props => {
  return (
    <>
      <Field name="username" type="text" component={renderInput} label="Username" />
      <Field
        name="role"
        component={renderSelect}
        options={["Student", "Teacher"]}
        label="Student/Teacher"
      />
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
  if (!values.email || values.email.trim() === "") errors.email = "Email cannot be blank";
  else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.email))
    errors.email = "Not a valid Email";
  return errors;
};

const mapStateToProps = state => {
  return { ...state.auth };
};

export default reduxForm({
  form: "signup",
  validate
})(
  connect(mapStateToProps, {
    redirect,
    signIn
  })(SignUpForm)
);
