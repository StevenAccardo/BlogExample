import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
//BrowserRouter interacts with the history library and determines what to do based on the change in the URL. It looks at the entire URL when determining what components are shown on the screen.
//Route does all of the hard work. Route is a React component that we can render inside any other react component that we use in our application. Route determines what components should be shown based off the changes in the url.
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);



ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        {/*If other elements are placed within the BrowserRouter, but are not Route components, they will be rendered no matter what the url is. So basically, they will be hard-coded in.*/}

        {/*Path and component must always be passed to a Route component. Path is usally a string with a route. If that user goes to that route, then the component associated with that path is rendered. The path name does not need to match the component name.*/}
        {/*Switch usually incases a few Route Components. Its purpose is to only allow rendering of the first component whos path matches the current url. because it uses the first component, you want to place your most specific paths first.*/}
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          {/*PostsShow route is the second one because the :id is a wild card and if we visted posts/new, the new portion would match the wildcard and would render the PostsShow component instead of the PostNew.*/}
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
, document.querySelector('.container'));
