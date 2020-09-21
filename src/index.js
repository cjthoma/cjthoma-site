import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// redux
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

// reducers
import reducer from './store/reducers/reducer';
import authReducer from './store/reducers/auth';

import './index.css';
import App from './App';

const rootReducer = combineReducers({
  auth: authReducer,
  reducer: reducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)


ReactDOM.render(
  <React.StrictMode>
    { app }
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
