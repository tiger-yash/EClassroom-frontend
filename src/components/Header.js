import React from "react";
import Logo from "./Logo";
import { connect } from "react-redux";
import { signOut, redirect } from "../actions";

const Header = ({ signOut, isSignedIn, redirect }) => {
  const AuthButton = () => {
    let onClick = null,
      text = "Sign In";
    if (isSignedIn === true) {
      onClick = signOut;
      text = "Sign Out";
    } else if (isSignedIn === false) {
      onClick = () => redirect("/login");
      text = "Sign In";
    }
    return (
      <button
        onClick={onClick}
        className="flex items-center py-1.5 px-3 rounded-md text-white bg-blue-600">
        <p className="">{text}</p>
      </button>
    );
  };
  return (
    <div className="flex h-12 items-center p-5 sticky top-0 bg-gray-200">
      <Logo className="mr-auto" />

      {AuthButton()}
    </div>
  );
};

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, {
  signOut,
  redirect
})(Header);
