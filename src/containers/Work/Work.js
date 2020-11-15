import React from 'react';
import { connect } from 'react-redux';
import PageNav from '../../components/PageNav/PageNav';

import DesktopWorkPage from './DesktopWorkPage/DesktopWorkPage';
import MobileWorkPage from './MobileWorkPage/WorkPage';
import style from './Work.module.css';
import * as actionTypes from '../../store/actions/actionTypes';
// import * as actions from '../../store/actions/';

const Work = (props) => {
    const desktopWorkPage = (
        <div className={style.Work} onMouseMove={(event) => props.mouseMove(event)}>
            <PageNav pageType={'work'} linkType={'HomePageLink'}/>
            <DesktopWorkPage 
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