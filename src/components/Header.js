import React from "react";
import Logo from "./Logo";
import { connect } from "react-redux";
import { signOut, redirect } from "../actions";
import { Button } from "@material-ui/core";
import SideNav from "./SideNav";

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
      <Button variant="contained" color="primary" onClick={onClick}>
        <p className="">{text}</p>
      </Button>
    );
  };
  return (
    <div className="flex h-12 items-center p-5 sticky top-0 bg-gray-200">
      {isSignedIn ? <SideNav /> : null}
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
