import React, { Component } from 'react';
import { connect } from 'react-redux';

import Fade from 'react-reveal/Fade';
import style from './ContactPage.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions/index';

class ContactPage extends Component {

    render() {
        let contactStyle = null;
        let alth1Style = { WebkitTextStroke: '0px transparent', color: this.props.defaultColors.primary, backgroundColor: this.props.secondary };
        let spanHighlightStyle = { color: this.props.defaultColors.primary, fontWeight: '400', cursor: 'pointer' }
    
        // checks if layer should recieve mask layer or default layer styles
        if(this.props.mask) {
            contactStyle = { ...this.props.mask, backgroundColor: this.props.colors.primary, WebkitTextStroke: '1px ' +this.props.secondary, color: 'transparent', overflowX: 'hidden' };
        } else if(window.innerWidth > 425) {
            contactStyle = { backgroundColor: this.props.colors.altColor, WebkitTextStroke: '1px ' +this.props.secondary, color: 'transparent',  };
        } else {
            contactStyle = { backgroundColor: this.props.colors.altColor, WebkitTextStroke: '1px ' +this.props.secondary, color: 'transparent',  };
        }
    
        let hoverStyleList = {
            color: this.props.secondary,
            letterSpacing: '-2px',
        }
    
        let defocusStyleList = {
            color: this.props.defaultColors.textDefocus, 
            letterSpacing: '2px',
            opacity: '.5'
        }
    
        let defaultStyleList = {
            color: this.props.secondary, 
            letterSpacing: '2px'
        }
    
        let linkedInStyle = defaultStyleList;
        let emailStyle = defaultStyleList;
        let gitStyle = defaultStyleList;
        let resumeStyle = defaultStyleList;
    
        if(this.props.hover) {
            switch(this.props.hover) {
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
                <h1 onMouseEnter={(event) => this.props.mouseOver(event.target, '100px')} onMouseOut={(event) => this.props.mouseOut(event)}>REACH OUT &</h1>
                <h1 onMouseEnter={(event) => this.props.mouseOver(event.target, '100px')} onMouseOut={(event) => this.props.mouseOut(event)} style={alth1Style}>GET IN CONTACT<br></br>WITH ME</h1>
                <div className={style.LinksWrapper}>
    
                    <a 
                        className={style.LinkContainer}
                        style={emailStyle}
                        onMouseEnter={(event) => this.props.mouseOver(event.target, '0px')} 
                        onMouseOut={(event) => this.props.mouseOut(event)}
                        href={"mailto:cjthoma79@gmail.com?"}>
                        <div style={emailStyle}>EMAIL</div>
                        <div style={{color: this.props.defaultColors.primary}} className={style.Arrow}></div>
                    </a>
    
                    <a 
                        className={style.LinkContainer}
                        style={linkedInStyle}
                        onMouseEnter={(event) => this.props.mouseOver(event.target, '0px')} 
                        onMouseOut={(event) => this.props.mouseOut(event)}
                        href={"https://www.linkedin.com/in/christian-thomas-74023b121/"}>
                        <div style={linkedInStyle}>LINKEDIN</div>
                        <div style={{color: this.props.defaultColors.primary}} className={style.Arrow}></div>
                    </a>
    
                    <a 
                        className={style.LinkContainer}
                        style={gitStyle}
                        onMouseEnter={(event) => this.props.mouseOver(event.target, '0px')} 
                        onMouseOut={(event) => this.props.mouseOut(event)}
                        href={"https://github.com/cjthoma"}>
                        <div style={gitStyle}>GITHUB</div>
                        <div style={{color: this.props.defaultColors.primary}} className={style.Arrow}></div>
                    </a>
    
                    <a 
                        className={style.LinkContainer}
                        style={resumeStyle}
                        onMouseEnter={(event) => this.props.mouseOver(event.target, '0px')} 
                        onMouseOut={(event) => this.props.mouseOut(event)}
                        href={"https://firebasestorage.googleapis.com/v0/b/cjthoma-aedf4.appspot.com/o/project_imgs%2FChristian%20Thomas.pdf?alt=media&token=97358f88-0a69-4020-b984-2fc34d533a04"}>
                        <div style={resumeStyle}>RESUME</div>
                        <div style={{color: this.props.defaultColors.primary}} className={style.Arrow}></div>
                    </a>
                    
                    <p style={{color: this.props.secondary}}>Reach out to me at <span style={spanHighlightStyle}>cjthoma79@gmail.com</span> if you feel 
                        I would be the right fit for your project. I'll get back 
                        to you <span style={spanHighlightStyle}>as soon as possible</span>.</p>
                </div>
                </Fade>
            </div>
        );
    }
};


const mapStateToProps = (state) => {
    return {
        hover: state.reducer.hover
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        mouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        mouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
        fetchInitState: () => dispatch(actions.fetchInitState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);