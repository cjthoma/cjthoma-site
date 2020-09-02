import React from 'react';
import { connect } from 'react-redux';

import Fade from 'react-reveal/Fade';
import style from './About.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';

const about = (props) => {
    let aboutStyle = { WebkitTextStroke: '2px ' +props.secondary, color: 'transparent' };
    let alth1Style = {  WebkitTextStroke: '0px transparent', color: '#5bc0be' };
    let paragraphStyle = { color: props.secondary };
    
    return(
        <div style={aboutStyle} className={style.About}>
            <Fade bottom>
            <h1 onMouseEnter={(event) => props.mouseOver(event.target, '100px')} onMouseOut={(event) => props.mouseOut(event)}>DIGITAL<br></br>DESIGNER &</h1>
            <h1 onMouseEnter={(event) => props.mouseOver(event.target, '100px')} onMouseOut={(event) => props.mouseOut(event)} style={alth1Style}>CREATIVE<br></br>DIRECTOR</h1>
            </Fade>
            
            <Fade bottom>
            <p style={paragraphStyle}>
                Hello and welcome to my site.

                My name is Christian, I have been working 
                as a freelance digital desginer for 5 years. I am also attending Metropolitan
                State University and plan to graduate with a BS in Computer Sciences. During my studies
                I have taken coursework on Data Structures, Networking, Databases, and have combined my 
                passion for graphic design and programming to focus my career on Front-End and Full-Stack Development.
                <br></br><br></br>
                Thank you for taking the time to visit and read through my site.

            </p>
            <div style={paragraphStyle}>RESUME</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(about);