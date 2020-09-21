import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './AboutPage.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions/index';

class About extends Component {

    render() {
        let aboutStyle = null;
        let alth1Style = {  WebkitTextStroke: '0px transparent', color: this.props.defaultColors.primary, backgroundColor: this.props.secondary };
        let paragraphStyle = { color: this.props.secondary };
        let spanHighlightStyle = { color: this.props.defaultColors.primary, fontWeight: '400', cursor: 'pointer' }

        let styleList = null;

        // checks if layer should recieve mask layer or default layer styles
        if(this.props.mask) {
            aboutStyle = { ...this.props.mask, backgroundColor: this.props.colors.primary, WebkitTextStroke: '1px ' +this.props.secondary, color: 'transparent', overflowX: 'hidden' };
        } else if(window.innerWidth > 425) {
            aboutStyle = { backgroundColor: this.props.colors.altColor, WebkitTextStroke: '1px ' +this.props.secondary, color: 'transparent',  };
        } else {
            aboutStyle = { backgroundColor: this.props.colors.altColor, WebkitTextStroke: '1px ' +this.props.secondary, color: 'transparent',  };
        }

        return(
            
            <div style={aboutStyle} className={style.About}>
                <h1 onMouseEnter={(event) => this.props.mouseOver(event.target, '100px')} onMouseOut={(event) => this.props.mouseOut(event)}>DIGITAL<br></br>DESIGNER &</h1>
                <h1 onMouseEnter={(event) => this.props.mouseOver(event.target, '100px')} onMouseOut={(event) => this.props.mouseOut(event)} style={alth1Style}>FRONT END<br></br>DEVELOPER</h1>
                
                <p style={paragraphStyle}>
                    Hello, I am <span style={spanHighlightStyle}>Christian Thomas</span>, a freelance digital designer of 3 years
                    who enjoys taking on new challenges and is always looking for ways to
                    improve. I value <span style={spanHighlightStyle}>critical thinking</span>, <span style={spanHighlightStyle}>creativity</span>, and <span style={spanHighlightStyle}>attention to detail</span>. <br></br> <br></br> <br></br>
                    
                    I am attending <span>Metropolitan State University of Denver</span> and plan to graduate 
                    with a <span style={spanHighlightStyle}>BS in Computer Sciences</span>.
                    If you have an offer, feel free to <span style={spanHighlightStyle}>get in touch</span> via the links on the <span style={spanHighlightStyle}>contact page</span>.
                </p>


                <div className={style.LinksWrapper}>
                    <a 
                        className={style.LinkContainer}
                        onMouseEnter={(event) => this.props.mouseOver(event.target, '1000px')} 
                        onMouseOut={(event) => this.props.mouseOut(event)}
                        href={"https://firebasestorage.googleapis.com/v0/b/cjthoma-aedf4.appspot.com/o/project_imgs%2FChristian%20Thomas.pdf?alt=media&token=97358f88-0a69-4020-b984-2fc34d533a04"}>
                        <div style={{ color: this.props.defaultColors.primary }}>RESUME</div>
                        <div style={{color: this.props.primary}} className={style.Arrow}></div>
                    </a>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        mouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        mouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
        // fetchInitState: () => dispatch(actions.fetchInitState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(About);