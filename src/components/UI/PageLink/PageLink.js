import React from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';

import style from './PageLink.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';
import StackItem from '../../../containers/Work/DesktopWorkPage/StackItem/StackItem';

const PageLink = (props) => {
    var HoverStyleList = { letterSpacing: '2px', color: props.secondary }
    var PageLinkStyle = { letterSpacing: '-3px', color: props.primary };
    // var BackgroundImg = { backgroundImage: `url(${props.imgs[0]})`}

    let page = null;
    if(props.hover === props.title.replace(/ .*/,'')) { // what does
        page = (
            <div key = {props.title.replace(/ .*/,'')}
                className={style.PageLink} 
                onMouseOver={(event) => props.mouseOver(event.target.parentNode.children[0], '30px')}
                onMouseOut={(event) => props.mouseOut(event)}>
                <h1 style={HoverStyleList} >{props.title.replace(/ .*/,'')}</h1>
                <h6 style={{ color: props.colors.secondary }}>{props.index}</h6>
                <div style={{ opacity: 1 }} className={style.Arrow}></div>
            </div>
        )
    } else {
        page = (
            <div key = {props.title.replace(/ .*/,'')}
                className={style.PageLink} 
                onMouseOver={(event) => props.mouseOver(event.target.parentNode.children[0], '30px')}
                onMouseOut={(event) => props.mouseOut(event)}>
                <h1 style={PageLinkStyle}>{props.title.replace(/ .*/,'')}</h1>
                <h6 style={{ color: props.colors.secondary }}>{props.index}</h6>
                <div style={{ opacity: 0 }} className={style.Arrow}></div>
            </div>
        )
    }
    
    return (
    <CSSTransitionGroup
        transitionName={{
            appear: style.appear,
            appearActive: style.appearActive,
            exit: style.exit,
            exitActive: style.exitActive,
            exitDone: style.exitDone,
        }}
        transitionAppear={true}
        transitionAppearTimeout={2000}
        transitionEnterTimeout={2000}
        transitionLeaveTimeout={2000}>
        {page}
    </CSSTransitionGroup>
    );
};

const mapStateToProps = (state) => {
    return {
        defaultColors: { ...state.reducer.defaultColors },
        colors: { ...state.reducer.altColors },
        projects: state.reducer.projects,
        hover: state.reducer.hover
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        mouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        mouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageLink);