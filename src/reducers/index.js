import { combineReducers } from 'redux';
//this imports the property reducer, but assigns it to a variable called formReducer. So we will use the variable formReducer whenever we want to use this. This is recommended by redux-form.
//Reddux form is just a boiler plate library that saves us time from having to set up a bunch of actionCreators and etc. to get the html forms to perform like their form examples will out of the box.
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts: PostsReducer,
  //Very important to use the word "form" as the key, all of the form elements we are going to implement rely on this key being named properly to work correctly.
  form: formReducer
});

export default rootReducer;
 
