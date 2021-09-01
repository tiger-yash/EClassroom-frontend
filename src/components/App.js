import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { TransitionGroup, Transition } from "react-transition-group";
import { exit, play } from "../timelines";
import Home from "./Home";
import Header from "./Header";
// import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import AllClassView from "./AllClassView";
import SnackBar from "./SnackBar";
import CreateTest from "./CreateTest";
import EditTest from "./EditTest";
import ViewTest from "./ViewTest";
import CreateAssignment from "./CreateAssignment";
import EditAssignment from "./EditAssignment";
import ViewAssignment from "./ViewAssignment";
import ClassView from "./ClassView";

// eslint-disable-next-line
import "../gauth";
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
  const location = useLocation();
  const { pathname, key } = location;
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SnackBar />
      <TransitionGroup component="main" className="page-main mt-12">
        <Transition
          key={key}
          timeout={{ enter: 300, exit: 150 }}
          appear
          onEnter={(node, appears) => play(pathname, node, appears)}
          onExit={(node, appears) => exit(node, appears)}>
          <section className="page-main-inner">
            <Switch location={location}>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/class" exact component={AllClassView} />
              <Route path="/class/:classId" exact component={ClassView} />
              <Route path="/class/:classId/test/create" exact component={CreateTest} />
              <Route path="/class/:classId/assignment/create" exact component={CreateAssignment} />
              <Route path="/class/:classId/test/:testId/edit" exact component={EditTest} />
              <Route
                path="/class/:classId/assignment/:assignmentId/edit"
                exact
                component={EditAssignment}
              />
              <Route path="/class/:classId/test/:testId" exact component={ViewTest} />
              <Route
                path="/class/:classId/assignment/:assignmentId"
                exact
                component={ViewAssignment}
              />
              <Route component={NotFound} />
            </Switch>
          </section>
        </Transition>
      </TransitionGroup>
    </div>
  );
};

export default App;
