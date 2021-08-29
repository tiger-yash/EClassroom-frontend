import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";
// eslint-disable-next-line
import { GoogleAuth } from "../gauth";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Switch>
        <>
          <Route path="/" component={Header} />
          <div className="px-4">
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
          </div>
          <Route path="/" component={Footer} />
        </>
      </Switch>
    </div>
  );
};

export default App;
