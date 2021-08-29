import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";
import history from "./history";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [routerMiddleware(history), thunk];
export const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
