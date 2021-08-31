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
      <div className="px-4">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/class" exact component={AllClassView} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
