import _ from 'lodash';
//Don't need to specify the file index in the path because it is the only file in the actions directory.
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';


export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      //es5 Method
      //const post = action.payload.data;
      //const newState = { ...state }
      //newState[post.id] = post;
      //return newState;

      //es6 method
      //using data interpelation to create a new key on the object and a corresponding value.
      //this will overwrite the same post, if we alredy fetched that one before. So if a post with an ID of 5 is already on the state, and we fetch it again, it will just overwrite it with the new one.
      return { ...state, [action.payload.data.id]: action.payload.data };

    case FETCH_POSTS:
      // We use the lodash library, and one of its methods to take the array located in action.payload.data and convert it into an object instead of an array, and we use the id value for each item in the array as the new key for each indvidual object inside the main object. This allows us to search for a specific post by id without having to loop through the entire array. Becomes very important for larger applications where the arrays may have thousands of indexes.
      //First argument is the array, 2nd argument is the key to the value you would like to make as the key for the new objects.
      return _.mapKeys(action.payload.data, 'id');
    //Using this case, so when the user deletes a post,
    case DELETE_POST:
      //Using a lodash method, omit(), that takes two args. 1st arg is the state object, and 2nd is a property key. Omit() looks through the object and searches for a property with a matching key. If it finds it, then it will return a new object with that property omitted. Doesn't modify the original object.
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
