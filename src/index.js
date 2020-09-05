import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import Login from './containers/Login/Login';
import Config from './containers/Config/Config';
import reducer from './store/reducer';


const store = createStore(reducer, applyMiddleware(thunk));


const app = (
  <Provider store={store}>
    <BrowserRouter>
        <Route path={'/admin-login'} component={ Login }/>
        <Route path={'/config-page'} component={ Config }/>
        <Route path={'/'} exact component={ App }/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    { app }
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
