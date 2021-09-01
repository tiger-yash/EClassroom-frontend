import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Home, Apps, Person } from "@material-ui/icons";
import { push } from "connected-react-router";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  nav: {
    width: 250
  }
}));

const SideNav = props => {
  const { push } = props;
  const classes = useStyles();
  const [state, setState] = useState();
  const toggleDrawer = open => event => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <div
      className={classes.nav}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button onClick={() => push("/")}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => push("/profile")}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={() => push("/class")}>
          <ListItemIcon>
            <Apps />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
  return (
    <>
      <IconButton
        color="primary"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer(true)}
        className={classes.menuButton}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
};

export default connect(null, { push })(SideNav);
