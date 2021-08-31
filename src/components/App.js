import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import AllClassView from "./AllClassView";
import SnackBar from "./SnackBar";
import Container from "@material-ui/core/Container";
import CreateTest from "./CreateTest";
import CreateAssignment from "./CreateAssignment";
// eslint-disable-next-line
import { GoogleAuth } from "../gauth";

const NotFound = () => {
  return (
    <div>
      <p>Page Not Found</p>
    </div>
  );
};
const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SnackBar />
      <Container maxWidth="xl">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/class" exact component={AllClassView} />
          <Route path="/class/:classId/test/create" exact component={CreateTest} />
          <Route path="/class/:classId/assignment/create" exact component={CreateAssignment} />
          <Route component={NotFound} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
