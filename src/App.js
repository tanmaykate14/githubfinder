import React from "react";

import "./App.css";

import Navbar from "./components/layout/Navbar";

import Users from "./components/users/Users";

import Axios from "axios";

class App extends React.Component {
  state = {
    users: [],

    loading: false
  };

  async componentDidMount() {
    console.log("process.env.REACT_APP_GITHUB_CLIENT_SECRET");

    this.setState({ loading: true });
    const res = await Axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data, loading: false });
  }
  render() {
    return (
      <div className='App'>
        <Navbar />

        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
