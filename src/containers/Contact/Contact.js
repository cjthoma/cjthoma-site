import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContactPage from './ContactPage/ContactPage';
import PageNav from '../../components/PageNav/PageNav';
import style from './Contact.module.css';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

const Contact = (props) => {

        return (
            <div className={style.Contact} onMouseMove={(event) => props.mouseMove(event)}>
            <PageNav pageType={'contact'} linkType={'HomePageLink'} />
                <ContactPage 
                    primary={props.colors.secondary} 
                    secondary={props.colors.primary}
                    defaultColors={props.defaultColors}
                    colors={props.colors} />
                <ContactPage 
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
        navFocusItem: state.reducer.navFocusItem,
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

export default connect(mapStateToProps, mapDispatchToProps)(Contact);