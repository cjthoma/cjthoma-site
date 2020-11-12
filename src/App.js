import React, { Component } from 'react';

import { connect } from 'react-redux';

import Aux from './hoc/Aux';
import style from './App.module.css';
import * as actionTypes from './store/actions/actionTypes';
import * as actions from './store/actions/index';

// redux
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

// routes
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import Auth from './containers/Auth/Auth';
import Work from './containers/Work/Work';
import ProjectModule from './containers/Work/DesktopWorkPage/ProjectContainer/ProjectModule/ProjectModule';
import About from './containers/About/About';
import Contact from './containers/Contact/Contact';
import Config from './containers/Config/Config';

// reducers
import reducer from './store/reducers/reducer';
import authReducer from './store/reducers/auth';

class App extends Component {

      componentDidMount() {
        this.props.fetchInitState();
        this.props.fetchProjects();
    }



  render() {

    const app = (
        <BrowserRouter>
        <Switch>
            <Route path={'/admin-login'} component={ Auth }/>
            <Route path={'/config-page'} component={ Config }/>
    
            <Route path={'/work/:pathParam'} component={ ProjectModule }/>
            <Route path={'/work'} component={ Work }/>
            <Route path={'/about'} component={ About }/>
            <Route path={'/contact'} component={ Contact }/>
            <Route path={'/'} component={ Home }/>
        </Switch>
        </BrowserRouter>
    )

    return (
      <Aux>
        { app }
      </Aux>
    );
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchInitState: () => dispatch(actions.fetchInitState()),
      fetchProjects: () => dispatch(actions.fetchProjects()),
      authCheckState: () => dispatch(actions.authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App);
