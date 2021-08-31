import React, { useState } from "react";
import Logo from "./Logo";
import { connect } from "react-redux";
import { signOut, redirect, joinClass } from "../actions";
import { Button } from "@material-ui/core";
import SideNav from "./SideNav";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import JoinClassCard from "./JoinClassCard";
const useStyles = makeStyles(theme => ({
  root: {
    "& > span": {
      margin: theme.spacing(2.5)
    }
  }
}));

const Header = ({ signOut, isSignedIn, redirect }) => {
  const [showJoinDialog, setJoinDialog] = useState(false);
  const confirm = () => {
    setJoinDialog(false);
  };
  const cancel = () => {
    setJoinDialog(false);
  };

  const classes = useStyles();
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
      <>
        <div className={classes.root}>
          {isSignedIn ? (
            <IconButton
              style={{ color: green[500] }}
              aria-label="add class"
              onClick={() => {
                setJoinDialog(true);
              }}>
              <AddIcon />
            </IconButton>
          ) : null}

        </div>
        <Button variant="contained" color="primary" onClick={onClick}>
          <p className="">{text}</p>
        </Button>
      </>
    );
  };
  return (
    <>
      <div className="flex h-12 items-center p-5 sticky top-0 bg-gray-200">
        {isSignedIn ? <SideNav /> : null}
        <Logo className="mr-auto" />
        {AuthButton()}
      </div>
      <JoinClassCard show={showJoinDialog} confirm={confirm} cancel={cancel} />
    </>
  );
};

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, {
  signOut,
  joinClass,
  redirect
})(Header);
