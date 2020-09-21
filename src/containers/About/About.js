import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux'
import style from './About.module.css';
import AboutPage from './AboutPage/AboutPage';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

const About = (props) => {

    return (
        <div className={style.About} onMouseMove={(event) => props.mouseMove(event)}>
            <AboutPage 
                primary={props.colors.secondary} 
                secondary={props.colors.primary}
                defaultColors={props.defaultColors}
                colors={props.colors} />
            <AboutPage 
                mask={props.mask}
                primary={props.colors.primary} 
                secondary={props.colors.secondary}
                defaultColors={props.defaultColors}
                colors={props.colors} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        defaultColors: { ...state.reducer.defaultColors },
        colors: { ...state.reducer.altColors },
        mask: { ...state.reducer.mask},
        navFocusItem: state.reducer.navFocusItem
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        mouseMove: (event) => dispatch({type: actionTypes.MOUSE_MOVE, payload: event}),
        // mouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        // mouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
        // fetchInitState: () => dispatch(actions.fetchInitState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(About);