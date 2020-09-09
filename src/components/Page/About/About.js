import React from 'react';
import { connect } from 'react-redux';

import Fade from 'react-reveal/Fade';
import style from './About.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';

const about = (props) => {
    let aboutStyle = { WebkitTextStroke: '1px ' +props.secondary, color: 'transparent',  };
    let alth1Style = {  WebkitTextStroke: '0px transparent', color: props.defaultColors.primary, backgroundColor: props.secondary };
    let paragraphStyle = { color: props.secondary };
    let spanHighlightStyle = { color: props.defaultColors.primary, fontWeight: '400', cursor: 'pointer' }
    console.log(props.colors)
    
    return(
        <div style={aboutStyle} className={style.About}>
            <Fade bottom>
            <h1 onMouseEnter={(event) => props.mouseOver(event.target, '100px')} onMouseOut={(event) => props.mouseOut(event)}>DIGITAL<br></br>DESIGNER &</h1>
            <h1 onMouseEnter={(event) => props.mouseOver(event.target, '100px')} onMouseOut={(event) => props.mouseOut(event)} style={alth1Style}>FRONT END<br></br>DEVELOPER</h1>
            </Fade>
            
            <Fade bottom>
                <p style={paragraphStyle}>
                    Hello, I am <span style={spanHighlightStyle}>Christian Thomas</span>, a freelance digital desginer of 3 years
                    who enjoys taking on new challenges and is always looking for ways to
                    improve. I value <span style={spanHighlightStyle}>critical thinking</span>, <span style={spanHighlightStyle}>creativity</span>, and <span style={spanHighlightStyle}>attention to detail</span>. <br></br> <br></br> <br></br>
                    
                    I am attending <span>Metropolitan State University of Denver</span> and plan to graduate 
                    with a <span style={spanHighlightStyle}>BS in Computer Sciences</span>.
                    If you have an offer, feel free to <span style={spanHighlightStyle}>get in touch</span> via the links on the <span style={spanHighlightStyle}>contact page</span>.

                </p>


                <div className={style.LinksWrapper}>
                    <a 
                        className={style.LinkContainer}
                        onMouseEnter={(event) => props.mouseOver(event.target, '1000px')} 
                        onMouseOut={(event) => props.mouseOut(event)}
                        href={"https://firebasestorage.googleapis.com/v0/b/cjthoma-aedf4.appspot.com/o/project_imgs%2FChristian%20Thomas.pdf?alt=media&token=97358f88-0a69-4020-b984-2fc34d533a04"}>
                        <div style={{ color: props.defaultColors.primary }}>RESUME</div>
                        <div style={{color: props.primary}} className={style.Arrow}></div>
                    </a>
                </div>

                
            </Fade>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        defaultColors: state.reducer.defaultColors
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        mouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        mouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(about);