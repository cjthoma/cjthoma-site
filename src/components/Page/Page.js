import React from 'react';
import { connect } from 'react-redux';

import Work from './Work/Work';
import About from './About/About';
import Contact from './Contact/Contact';
import Button from '../UI/Button/Button';
import style from './Page.module.css';
import * as actionTypes from '../../store/actions/actionTypes';

const Page = (props) => {
    let page = null;
    let pageScroll = null;
    let classList = null;
    let pageStyles = { backgroundColor: props.altColor }

    if(!(props.mask) && window.innerWidth > 425){
        pageScroll = { transform: "translateY("+-((props.scrollPos))+"px)" }
        classList = style.Page +' '+style.imgFilter;
    } else {
        classList = style.Page;
    }

    switch(props.pageType){
        case 'WORK':
            page = <Work 
                        primary={props.secondary}
                        secondary={props.primary} />
            break;

        case 'ABOUT':
            page = <About
                        primary={props.secondary}
                        secondary={props.primary} />
            if(window.innerWidth > 425) pageStyles = { backgroundColor: props.altColor, overflow: 'hidden' }
            break;

        case 'CONTACT':
            page = <Contact 
                        primary={props.secondary}
                        secondary={props.primary} />
            if(window.innerWidth > 425) pageStyles = { backgroundColor: props.altColor, overflow: 'hidden' }
            break;
        
        default:
            break;
    }

    return (
        <div style={pageStyles} className={classList}>
            <nav style={{backgroundColor: props.altColor}}> 
                <Button />
                <h1 style={{color: props.primary}}>CHRISTIAN THOMAS</h1>
                <p style={{color: props.primary}}>{props.pageType}</p>
            </nav>
            <div className={style.Content} style={pageScroll}>
                { page }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pageType: state.reducer.navFocusItem,
        scrollPos: state.reducer.scrollPos,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        mouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        mouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);