import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=stevenca';


export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

//we pass in the callback from the onSubmit function in the posts_new component
export function createPost(values, callback) {
  //on axios posts, we pass the path and then we pass in the values as well.
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
  //using a promise by using the .then() method and passing is a fucntion that then calls our callback function once the request is compelete.
  .then(() => callback());

  return {
    type: CREATE_POST,
    payload: request
  }
}

//Fetches a single post with a specific id
export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
  .then(() => callback());

  return {
    type: DELETE_POST,
    payload: id
  }
}
