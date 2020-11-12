import React from 'react';
import { connect } from 'react-redux';

import Button from '../UI/Button/Button';
import style from './PageNav.module.css';
import * as actionTypes from '../../store/actions/actionTypes';

const PageNav = (props) => {
    let pageStyles = { backgroundColor: props.altColor }

    return (
        <div className={style.PageNav} >
            <nav>  
                <Button linkType={props.linkType} />
                <h1 style={{color: props.defaultColors.primary}}>CHRISTIAN THOMAS</h1>
                <p style={{color: props.defaultColors.primary}}>{props.pageType.toUpperCase()}</p>
            </nav>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
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