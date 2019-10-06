import React from "react";
import PropTypes from "prop-types"

import "./App.css";

import Navbar from "./components/layout/Navbar";

import Users from "./components/users/Users";

import Axios from "axios";

import Search from "./components/users/Search"

class App extends React.Component {
  state = {
    users: [],

    loading: false
  };

  static propTypes = {
    searchUsers : PropTypes.func.isRequired,
  }

  // async componentDidMount() {
  //   console.log("process.env.REACT_APP_GITHUB_CLIENT_SECRET");

  //   this.setState({ loading: true });
  //   const res = await Axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ users: res.data, loading: false });
  // }
// Search gitHub users
  searchUser = async (text) => {
    this.setState({loading:true})
console.log(text);
const res = await Axios.get(
  `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
);
console.log(res.data);

this.setState({ users: res.data.items, loading: false });

  }
  render() {
    return (
      <div className='App'>
        <Navbar />

        <div className='container'>
          <Search searchUser = {this.searchUser}/>
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;


