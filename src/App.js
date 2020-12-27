import React, { Component, useState, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import { auth } from "./services/firebase";
import PrivateRoute from "./hocs/PrivateRoute";
import PublicRoute from "./hocs/PublicRoute";

function App() {
  const [loading, setLoading] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setAuthed(true);
        setLoading(false);
      } else {
        setAuthed(false);
        setLoading(false);
      }
    })
  })

  return loading === true ? (
    <h2>Loading...</h2>
  ) : (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute path="/chat" authenticated={authed} component={Chat} />
        <PublicRoute path="/signup" authenticated={authed} component={Signup} />
        <PublicRoute path="/login" authenticated={authed} component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
