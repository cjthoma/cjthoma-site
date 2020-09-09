import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import Auth from './containers/Auth/Auth';
import Login from './containers/Login/Login';
import Config from './containers/Config/Config';
import reducer from './store/reducers/reducer';
import authReducer from './store/reducers/auth';



const rootReducer = combineReducers({
  auth: authReducer,
  reducer: reducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

let routes = {

}

if(store.getState().auth.token) {
  
}

const app = (
  <Provider store={store}>
    <BrowserRouter>
    <Switch>
        <Route path={'/admin-login'} component={ Auth }/>
        <Route path={'/config-page'} component={ Config }/>
        <Route path={'/'} component={ App }/>
      </Switch>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    { app }
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
