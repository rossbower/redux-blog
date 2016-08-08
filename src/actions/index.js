import axios from 'axios';
import { browserHistory } from 'react-router';

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://ross-blog-server.herokuapp.com/api';
const API_KEY = '?key=r_bower';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  // DELETE_POST: 'DELETE_POST',
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
    axios.post(`${ROOT_URL}/posts/${API_KEY}`, fields).then(response => {
      browserHistory.push('/');
    });
  };
}

export function updatePost(post) {
  return (dispatch) => {
    const fields = { title: post.title, content: post.content, tags: post.tags };
    axios.put(`${ROOT_URL}/posts/${post.id}${API_KEY}`, fields).then(response => {
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
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then(response => {
      browserHistory.push('/');
    });
  };
}
