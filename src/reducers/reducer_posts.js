import _ from 'lodash';
//Don't need to specify the file index in the path because it is the only file in the actions directory.
import { FETCH_POSTS } from '../actions';


export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      // We use the lodash library, and one of its methods to take the array located in action.payload.data and convert it into an object instead of an array, and we use the id value for each item in the array as the new key for each indvidual object inside the main object. This allows us to search for a specific post by id without having to loop through the entire array. Becomes very important for larger applications where the arrays may have thousands of indexes.
      //First argument is the array, 2nd argument is the key to the value you would like to make as the key for the new objects.
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
