import React from 'react';
import { connect } from 'react-redux';

import Fade from 'react-reveal/Fade';
import style from './Contact.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';
import { link } from 'fs';

const Contact = (props) => {
    let contactStyle = { WebkitTextStroke: '1px ' +props.secondary, color: 'transparent' };
    let alth1Style = { WebkitTextStroke: '0px transparent', color: props.defaultColors.primary, backgroundColor: props.secondary };
    let spanHighlightStyle = { color: props.defaultColors.primary, fontWeight: '400', cursor: 'pointer' }


    let hoverStyleList = {
        color: props.secondary,
        letterSpacing: '-2px',
    }

    let defocusStyleList = {
        color: props.defaultColors.textDefocus, 
        letterSpacing: '2px',
        opacity: '.5'
    }

    let defaultStyleList = {
        color: props.secondary, 
        letterSpacing: '2px'
    }

    let linkedInStyle = defaultStyleList;
    let emailStyle = defaultStyleList;
    let gitStyle = defaultStyleList;
    let resumeStyle = defaultStyleList;

    if(props.hover) {
        switch(props.hover) {
            case 'LINKEDIN': {
                linkedInStyle = hoverStyleList;
                emailStyle = defocusStyleList;
                gitStyle = defocusStyleList;
                resumeStyle = defocusStyleList;
                break;
            }
            case 'EMAIL': {
                emailStyle = hoverStyleList;
                linkedInStyle = defocusStyleList;
                gitStyle = defocusStyleList;
                resumeStyle = defocusStyleList;
                break;
            }
            case 'GITHUB': {
                gitStyle = hoverStyleList;
                emailStyle = defocusStyleList;
                linkedInStyle = defocusStyleList;
                resumeStyle = defocusStyleList;
                break;
            }

            case 'RESUME': {
                resumeStyle = hoverStyleList;
                emailStyle = defocusStyleList;
                linkedInStyle = defocusStyleList;
                gitStyle = defocusStyleList;
                break;
            }
            default:
                break;
        }
    }
    return (
        <div style={contactStyle} className={style.Contact}>
            <Fade bottom>
            <h1 onMouseEnter={(event) => props.mouseOver(event.target, '100px')} onMouseOut={(event) => props.mouseOut(event)}>REACH OUT &</h1>
            <h1 onMouseEnter={(event) => props.mouseOver(event.target, '100px')} onMouseOut={(event) => props.mouseOut(event)} style={alth1Style}>GET IN CONTACT<br></br>WITH ME</h1>
            <div className={style.LinksWrapper}>

                <a 
                    className={style.LinkContainer}
                    style={emailStyle}
                    onMouseEnter={(event) => props.mouseOver(event.target, '5px')} 
                    onMouseOut={(event) => props.mouseOut(event)}
                    href={"mailto:cjthoma79@gmail.com?"}>
                    <div style={emailStyle}>EMAIL</div>
                    <div style={{color: props.defaultColors.primary}} className={style.Arrow}></div>
                </a>

                <a 
                    className={style.LinkContainer}
                    style={linkedInStyle}
                    onMouseEnter={(event) => props.mouseOver(event.target, '5px')} 
                    onMouseOut={(event) => props.mouseOut(event)}
                    href={"https://www.linkedin.com/in/christian-thomas-74023b121/"}>
                    <div style={linkedInStyle}>LINKEDIN</div>
                    <div style={{color: props.defaultColors.primary}} className={style.Arrow}></div>
                </a>

                <a 
                    className={style.LinkContainer}
                    style={gitStyle}
                    onMouseEnter={(event) => props.mouseOver(event.target, '5px')} 
                    onMouseOut={(event) => props.mouseOut(event)}
                    href={"https://github.com/cjthoma"}>
                    <div style={gitStyle}>GITHUB</div>
                    <div style={{color: props.defaultColors.primary}} className={style.Arrow}></div>
                </a>

                <a 
                    className={style.LinkContainer}
                    style={resumeStyle}
                    onMouseEnter={(event) => props.mouseOver(event.target, '5px')} 
                    onMouseOut={(event) => props.mouseOut(event)}
                    href={"https://firebasestorage.googleapis.com/v0/b/cjthoma-aedf4.appspot.com/o/project_imgs%2FChristian%20Thomas.pdf?alt=media&token=97358f88-0a69-4020-b984-2fc34d533a04"}>
                    <div style={resumeStyle}>RESUME</div>
                    <div style={{color: props.defaultColors.primary}} className={style.Arrow}></div>
                </a>
                
                <p style={{color: props.secondary}}>Reach out to me at <span style={spanHighlightStyle}>cjthoma79@gmail.com</span> if you feel 
                    I would be the right fit for your project. I'll get back 
                    to you <span style={spanHighlightStyle}>as soon as possible</span>.</p>
            </div>

            </Fade>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        defaultColors: state.defaultColors,
        hover: state.hover
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        mouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        mouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);