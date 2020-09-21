import React, { Component } from 'react';
import { connect } from 'react-redux';

import DesktopWorkPage from './ProjectsContainer/ProjectsContainer';
import MobileWorkPage from './MobileWorkPage/WorkPage';
import style from './Work.module.css';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/';

const Work = (props) => {

    const mobileWorkPage = (
        <div className={style.Work} onMouseMove={(event) => props.mouseMove(event)}>
            <MobileWorkPage 
                primary={props.colors.secondary} 
                secondary={props.colors.primary}
                defaultColors={props.defaultColors}
                colors={props.colors} />
            {/* <MobileWorkPage 
                mask={props.mask}
                primary={props.colors.primary} 
                secondary={props.colors.secondary}
                defaultColors={props.defaultColors}
                colors={props.colors} /> */}
        </div>
    )

    const desktopWorkPage = (
        <div className={style.Work} onMouseMove={(event) => props.mouseMove(event)}>
            <DesktopWorkPage 
                primary={props.colors.secondary} 
                secondary={props.colors.primary}
                defaultColors={props.defaultColors}
                colors={props.colors} />

            <DesktopWorkPage 
                // mask={props.mask}
                primary={props.colors.primary} 
                secondary={props.colors.secondary}
                defaultColors={props.defaultColors}
                colors={props.colors} />
        </div>
    )

    return (
        desktopWorkPage 
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Work);