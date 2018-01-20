import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//BrowserRouter interacts with the history library and determines what to do based on the change in the URL. It looks at the entire URL when determining what components are shown on the screen.
//Route does all of the hard work. Route is a React component that we can render inside any other react component that we use in our application. Route determines what components should be shown based off the changes in the url.
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/app';
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware()(createStore);

class Hello extends React.Component {
  render() { return <div>Hello!</div> }
}

class Goodbye extends React.Component {
  render() { return <div>Goodbye!</div> }
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        {/*If other elements are placed within the BrowserRouter, but are not Route components, they will be rendered no matter what the url is. So basically, they will be hard-coded in.*/}
        Header
        {/*Path and component must always be passed to a Route component. Path is usally a string with a route. If that user goes to that route, then the component associated with that path is rendered. The path name does not need to match the component name.*/}
        <Route path="/hello" component={Hello}/>
        <Route path="/goodbye" component={Goodbye}/>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
