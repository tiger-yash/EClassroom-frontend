// import Button from "@material-ui/core/Button";
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { snackBarClose } from "../actions";
import { connect } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomSnackBar = ({ snackPack = [], snackBarClose }) => {
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      snackBarClose();
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open, snackBarClose]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}>
      <Alert onClose={handleClose} severity={messageInfo ? messageInfo.type : null}>
        {messageInfo ? messageInfo.message : null}
      </Alert>
    </Snackbar>
  );
};

export default connect(
  state => ({
    snackPack: state.snackBar.snackPack
  }),
  { snackBarClose }
)(CustomSnackBar);
