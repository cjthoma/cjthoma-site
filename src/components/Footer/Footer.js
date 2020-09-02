import React, { Component } from 'react';
import { connect } from 'react-redux';

import anime from 'animejs';
import style from './Footer.module.css';
import * as actionTypes from '../../store/actions/actionTypes';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.footerRef = React.createRef();
    }
    
    componentDidMount() {
        let footerItem = this.footerRef.current;

        anime.timeline({loop: false})
        .add({
            targets: [footerItem],
            translateY: [-500, 0],
            opacity: {
                value: [0, 1],
                delay: 300,
                duration: 1500
            },
            scale: {
                value: [.9, 1],
                delay: 800,
                duraion: 500
            },
            duraion: 1000,
            delay: (el, i) => 30 * i,
            easing: 'easeOutExpo'
        });
    }

    render() {
        return (
            <div ref={this.footerRef} style={{color: this.props.secondary}} className={style.Footer} onMouseEnter={(event) => this.props.mouseOver(event.target, '50px')} onMouseOut={(event) => this.props.mouseOut(event)}>
                <span href={'https://www.github.com'}>GITHUB</span>
                <span href={'https://www.linkedin.com/in/christian-thomas-74023b121/'}>LINKEDIN</span></div>
        );
    };
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);