import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../../../hoc/Aux';
import StackItem from './StackItem/StackItem';
import style from './ProjectContainer.module.css';
import * as actionTypes from '../../../../store/actions/actionTypes';

const ProjectContainer = (props) => {
    let HoverStyleList = { letterSpacing: '-3px', }
    let ProjectContainerStyle = {};
    let BackgroundImg = { backgroundImage: `url(${props.imgs[0]})`}

    let page = null;
    if(props.hover === props.title.replace(/ .*/,'')) {
        page = (
            <div className={style.ProjectContainer} onMouseOver={(event) => props.mouseOver(event.target.parentNode.children[0], '30px')}>
                <h1 style={HoverStyleList} >{props.title.replace(/ .*/,'')}</h1>
                <h6>{props.index}</h6>
                <div style={{color: 'white'}} className={style.Arrow}></div>
            </div>
        )
    } else {
        page = (
            <div 
                className={style.ProjectContainer} 
                onMouseOver={(event) => props.mouseOver(event.target.parentNode.children[0], '30px')}
                onMouseOut={(event) => props.mouseOut(event)}>
                <h1 style={ProjectContainerStyle}>{props.title.replace(/ .*/,'')}</h1>
                <h6>{props.index}</h6>
                <div style={{color: 'white'}} className={style.Arrow}></div>
            </div>
        )
    }
    
    return (
        page
    );
};

const mapStateToProps = (state) => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer);