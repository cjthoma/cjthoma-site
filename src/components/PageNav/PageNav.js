import React from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';

import Button from '../UI/Button/Button';
import style from './PageNav.module.css';
import * as actionTypes from '../../store/actions/actionTypes';

const PageNav = (props) => {
    var navStyle = null;
    var navTransition = style.appear;
    var navTransitionActive = style.appearActive;
    if(window.innerWidth <= 865) {
        navStyle = { backgroundColor: props.colors.altColor, boxShadow: '1px 5px rgb(0, 0, 0, .2)'};
        navTransition = style.appearMobile;
        navTransitionActive = style.appearActiveMobile;
    }


    return (
        <CSSTransitionGroup
        transitionName={{
            appear: navTransition,
            appearActive: navTransitionActive,
        }}
        transitionAppear={true}
        transitionAppearTimeout={1500}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}>
        <div className={style.PageNav} >
            <nav style={navStyle}>  
                <Button linkType={props.linkType} />
                <h1 style={{color: props.defaultColors.primary}}>CHRISTIAN THOMAS</h1>
                <p style={{color: props.defaultColors.primary}}>{props.pageType.toUpperCase()}</p>
            </nav>
        </div>
    </CSSTransitionGroup>

    );
};

const mapStateToProps = (state) => {
    return {
        colors: { ...state.reducer.altColors },
        defaultColors: { ...state.reducer.defaultColors },
        scrollPos: state.reducer.scrollPos,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        mouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        mouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageNav);