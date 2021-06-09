import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import {store,persistor} from "./redux/store.js";
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react"

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <PersistGate persistor={persistor}>
      <App />
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById("root")
);
