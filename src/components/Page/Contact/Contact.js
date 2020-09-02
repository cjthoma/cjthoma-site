import React from 'react';
import { connect } from 'react-redux';

import Fade from 'react-reveal/Fade';
import style from './Contact.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';

const Contact = (props) => {
    let contactStyle = { WebkitTextStroke: '2px ' +props.secondary, color: 'transparent' };
    let alth1Style = { WebkitTextStroke: '0px transparent', color: '#5bc0be' };
    let paragraphStyle = { color: props.secondary };

    return (
        <div style={contactStyle} className={style.Contact}>
            <Fade bottom>
            <h1 onMouseEnter={(event) => props.mouseOver(event.target, '100px')} onMouseOut={(event) => props.mouseOut(event)}>REACH OUT &</h1>
            <h1 onMouseEnter={(event) => props.mouseOver(event.target, '100px')} onMouseOut={(event) => props.mouseOut(event)} style={alth1Style}>GET IN CONTACT</h1>
            <h1 onMouseEnter={(event) => props.mouseOver(event.target, '100px')} onMouseOut={(event) => props.mouseOut(event)} style={alth1Style}>WITH ME</h1>
            <p style={paragraphStyle}>
                Email - CJTHOMA79@GMAIL.COM
                <br></br>
                LinkedIn
                <br></br>
                Github
                <br></br>
                BUSINESS INQUIRIES ONLY PLEASE AND THANK YOU
            </p>
            </Fade>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        mouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        mouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);