import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Header from '../../components/Header/Header';
import Page from '../../components/Page/Page';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import style from './Layout.module.css';
// import * as actionTypes from '../../store/actions';

const Layout = (props) => {
    let loadPage = null;
    let styleList = null;

    // checks if layer should recieve mask layer or default layer styles
    if(props.mask) {
        styleList = props.navFocusItem ? { ...props.mask, overflowX: 'hidden' } : { ...props.mask, overflow: 'hidden' }
    } else if(window.innerWidth > 425) {
        styleList = { backgroundColor: props.altColor, overflow: 'hidden' };
    } else {
        styleList = { backgroundColor: props.altColor };
    }

    return (
        <div className={style.Layout} style={styleList}>
            <Header secondary={props.secondary} />
            <NavBar 
                primary={props.primary} 
                secondary={props.secondary} />
            <Footer secondary={props.secondary} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        navFocusItem: state.reducer.navFocusItem
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // mouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        // mouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);