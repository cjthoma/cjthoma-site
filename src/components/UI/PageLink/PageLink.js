import React from 'react';
import { connect } from 'react-redux';

import style from './PageLink.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';

const PageLink = (props) => {
    var HoverStyleList = { letterSpacing: '5px', color: props.colors.primary }
    var PageLinkStyle = { letterSpacing: '-3px', color: props.defaultColors.primary };
    // var BackgroundImg = { backgroundImage: `url(${props.imgs[0]})`}

    let page = null;
    if(props.hover === props.title.replace(/ .*/,'')) { // what does
        page = (
            <div 
                className={style.PageLink} 
                onMouseOver={(event) => props.mouseOver(event.target.parentNode.children[0], '30px')}
                onMouseOut={(event) => props.mouseOut(event)}>
                <h1 style={HoverStyleList} >{props.title.replace(/ .*/,'')}</h1>
                <h6 style={{color: props.colors.secondary }}>{props.index}</h6>
                <div style={{color: 'white', opacity: 1}} className={style.Arrow}></div>
            </div>
        )
    } else {
        page = (
            <div 
                className={style.PageLink} 
                onMouseOver={(event) => props.mouseOver(event.target.parentNode.children[0], '30px')}
                onMouseOut={(event) => props.mouseOut(event)}>
                <h1 style={PageLinkStyle}>{props.title.replace(/ .*/,'')}</h1>
                <h6 style={{color: props.colors.secondary }}>{props.index}</h6>
                <div style={{color: 'white', opacity: 0}} className={style.Arrow}></div>
            </div>
        )
    }
    
    return (
        page
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