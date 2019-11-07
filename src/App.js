import React from "react";
import PropTypes from "prop-types";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GitHubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

import "./App.css";

import Navbar from "./components/layout/Navbar";

import NotFound from "./components/pages/NotFound"

import Home from "./components/pages/Home"

import Alert from "./components/layout/Alert";

import About from "./components/pages/About";

import User from "./components/users/User";

const App = () => {
  return (
    <GitHubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar />

            <div className='container'>
              <Alert></Alert>
              <Switch>
                <Route
                  exact
                  path='/'
                  component={Home}
                  
                ></Route>
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' component={User}></Route>
                <Route component = {NotFound}/>
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GitHubState>
  );
};

App.propTypes = {
  searchUsers: PropTypes.func.isRequired
};

export default App;
