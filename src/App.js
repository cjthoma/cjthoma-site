import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from './hoc/Aux';
import Layout from './containers/Layout/Layout';
import style from './App.module.css';
import * as actionTypes from './store/actions/actionTypes';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.fetchInitState();
    this.props.fetchProjects();
  }

  render() {
    let loadPage = null;

    // Serves page without mask for mobile version (page < 400px)
    if(window.innerWidth > 425) {
      loadPage = (
        <div className={style.App} onMouseMove={(event) => this.props.mouseMove(event)} onScroll={(event) => this.props.onPageScroll(event.target)}>
          <Layout 
            primary={this.props.colors.secondary} 
            secondary={this.props.colors.primary}
            altColor={this.props.colors.altColor} />

          <Layout mask={this.props.mask} // Top Layout Layer recieves mask (top in that it is rendered last and is on the top of the stack)
            primary={this.props.colors.primary} 
            secondary={this.props.colors.secondary} />
        </div>
      );
    } else {
      loadPage = (
        <div className={style.App} onMouseMove={(event) => this.props.mouseMove(event)} onScroll={(event) => this.props.onPageScroll(event)}>
          <Layout 
            primary={this.props.colors.secondary} 
            secondary={this.props.colors.primary}
            altColor={this.props.colors.altColor} />
        </div>
      );

    }
    return (
      <Aux>
        { loadPage }
      </Aux>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    colors: { ...state.colors },
    mask: { ...state.mask},
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      mouseMove: (event) => dispatch({type: actionTypes.MOUSE_MOVE, payload: event}),
      onPageScroll: (event) => dispatch({type: actionTypes.ON_SCROLL_HANDLER, payload: event}),
      fetchInitState: () => dispatch(actions.fetchInitState()),
      fetchProjects: () => dispatch(actions.fetchProjects())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);