import React from "react";
import PropTypes from "prop-types";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/layout/Navbar";

import Users from "./components/users/Users";

import Axios from "axios";

import Search from "./components/users/Search";

import Alert from "./components/layout/Alert";

import About from "./components/pages/About";

import User from "./components/users/User";

class App extends React.Component {
  state = {
    users: [],
    repos:[],
    user: {},


    loading: false,

    alert: null
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired
  };

  // async componentDidMount() {
  //   console.log("process.env.REACT_APP_GITHUB_CLIENT_SECRET");

  //   this.setState({ loading: true });
  //   const res = await Axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ users: res.data, loading: false });
  // }
  // Search gitHub users

  searchUser = async text => {
    this.setState({ loading: true });
    console.log(text);
    const res = await Axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(res.data);

    this.setState({ users: res.data.items, loading: false });

    // Clear Users from state
  };

  // Get single Github User

  getUser = async username => {
    this.setState({ loading: true });

    const res = await Axios.get(
      `https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(res.data);
    this.setState({ user: res.data, loading: false });
  };

  // Get User Repos

  getUserRepos = async username => {
    this.setState({ loading: true });

    const res = await Axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(res.data);
    this.setState({ repos: res.data, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };
  render() {
    const { users, loading, user ,repos } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar />

          <div className='container'>
            <Alert alert={this.state.alert}></Alert>
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <React.Fragment>
                    <Search
                      searchUser={this.searchUser}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </React.Fragment>
                )}
              ></Route>
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos = {this.getUserRepos}
                    repos = {repos}
                    user={user}
                    loading={loading}
                  />
                )}
              ></Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
