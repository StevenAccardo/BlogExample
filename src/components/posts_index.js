//The component shown when at the root path "/", i.e. the first page shown. A list of posts the user has created.
import React, { Component } from 'react';
import { connect } from 'react-redux';
//Link is essentially the same as an anchor tag <a> used in a standard website to change to a different URL.
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import _ from 'lodash';

class PostsIndex extends Component {
  //Called one time as soon as the component is rendered onto the DOM.
  componentDidMount() {
    //calls the actionCreator to kick off the axios http request.
    this.props.fetchPosts();
  }

  renderPosts() {
    //since this.props.posts is an object and not an array, we are using lodash's map function to cycle through each object because it has the ability to do so. The lodash map function returns an array, which is what react will expect for creating the <li>'s. The first argument is the object to map over, and the second argument is the function that will manipulate each sub-object before returning it.
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      );
    });
  }

  render() {

    return (
      <div>
        <div className="text-xs-right">
          {/*Using the Link component as an anchor tag to allow the user to navigate to a "new page", which is really just a trigger for the application to render new components that match the url.*/}
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
            </div>
        <h3>Posts</h3>
        <ul className= "list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return { posts: state.posts };
}

// This is usually the preferred method for passing an action creator into props, and is also the shorthanded way of doing so, instead of using the mapDispatchToProps function. Generally, you only use that if you want to do some work on the action creator before passing it.
//Used es6 destructor for the action creator { fetchPosts } === { fetchPosts: fetchPosts }
//connect is responsible for mapping the actionCreator to the props this way.
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
