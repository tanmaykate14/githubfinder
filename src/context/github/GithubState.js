import React, { useReducer } from "react";

import Axios from "axios";

import GithubContext from "./githubContext";

import GithubReducer from "./gitHubReducer";

import {
  SEARCH_USERS,
  GET_REPOS,
  GET_USER,
  CLEAR_USERS,
  SET_LOADING
} from "../types";

let githubClientId;

let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GitHubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search User

  const searchUser = async text => {
    setLoading();
    console.log(text);
    const res = await Axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };

  // Get User

  const getUser = async username => {
    setLoading();

    const res = await Axios.get(
      `https://api.github.com/users/${username}?&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  // Get Repos

  const getUserRepos = async username => {
    setLoading();

    const res = await Axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  // ClearUser

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUser,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GitHubState;
