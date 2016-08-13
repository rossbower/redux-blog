import axios from 'axios';
import { browserHistory } from 'react-router';

const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'http://ross-blog-server.herokuapp.com/api';
const API_KEY = '?key=r_bower';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  // DELETE_POST: 'DELETE_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then(response => {
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
    }).catch(error => {
      // hit an error do something else!
    });
  };
}

export function createPost(post) {
  return (dispatch) => {
    const fields = { title: post.title, content: post.content, tags: post.tags };
    axios.post(`${ROOT_URL}/posts/${API_KEY}`, fields, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      browserHistory.push('/');
    });
  };
}

export function updatePost(post) {
  return (dispatch) => {
    const fields = { title: post.title, content: post.content, tags: post.tags };
    axios.put(`${ROOT_URL}/posts/${post.id}${API_KEY}`, fields, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
      location.reload();
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then(response => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
    }).catch(error => {
      // hit an error do something else!
    });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      browserHistory.push('/');
    });
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password }) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  return (dispatch) => {
    // does an axios.post on the /signin endpoint
    const user = { email, password };
    axios.post(`${ROOT_URL}/signin`, user).then(response => {
      // on success does:
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
    }).catch(error => {
      // on error should
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

export function signupUser({ username, email, password }) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  return (dispatch) => {
    // does an axios.post on the /signup endpoint (only difference from above)
    const user = { username, email, password };
    axios.post(`${ROOT_URL}/signup`, user).then(response => {
      // on success does:
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
    }).catch(error => {
    // on error should
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    browserHistory.push('/');
  };
}
