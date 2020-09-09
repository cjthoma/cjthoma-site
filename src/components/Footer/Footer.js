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

        let gitHubStyleList = { color: this.props.secondary };
        let linkedInStyleList = { color: this.props.secondary } ;

        if(this.props.hover === 'GITHUB') {
            linkedInStyleList = { color: this.props.colors.textDefocus, opacity: '.2' }
        } else if (this.props.hover === 'LINKEDIN') {
            gitHubStyleList = { color: this.props.colors.textDefocus, opacity: '.2' }
        } else if (this.props.hover) {
            gitHubStyleList = { color: this.props.colors.textDefocus, opacity: '.2' }
            linkedInStyleList = { color: this.props.colors.textDefocus, opacity: '.2' }
        }
        return (
            <div ref={this.footerRef} className={style.Footer}>
                <a 
                    style={gitHubStyleList} 
                    onMouseEnter={(event) => this.props.mouseOver(event.target, '50px')} 
                    onMouseOut={(event) => this.props.mouseOut(event)} 
                    href={"https://github.com/cjthoma"}>GITHUB</a>
                <a 
                    style={linkedInStyleList} 
                    onMouseEnter={(event) => this.props.mouseOver(event.target, '50px')} 
                    onMouseOut={(event) => this.props.mouseOut(event)} 
                    href={"https://www.linkedin.com/in/christian-thomas-74023b121/"}>LINKEDIN</a></div>
        );
    };
};



const mapStateToProps = (state) => {
    return {
        colors: state.reducer.colors,
        hover: state.reducer.hover
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        mouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        mouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);