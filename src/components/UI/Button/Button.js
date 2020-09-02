import React, { Component } from 'react';
import { connect } from 'react-redux';

import anime from 'animejs';
import style from './Button.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';

class Button extends Component {
    constructor(props) {
        super(props);
        this.buttonItemRef = React.createRef();  
    }

    componentDidMount() {
        let button = this.buttonItemRef.current.children;

        anime.timeline({loop: false})
        .add({
            targets: [button],
            translateY: [-20, 0],
            duraion: 2000,
            delay: (el, i) => 50 * i,
            easing: 'easeOutExpo'
        });
    }

    render () {

        let buttonStyle = { border: '1px solid ' +this.props.primary }
        let squareStyle = { backgroundColor: this.props.primary }


        if(this.props.buttonHover && this.props.hover === '') {
            buttonStyle = { border: '1px solid ' +this.props.secondary }
            squareStyle = { backgroundColor: this.props.secondary }

        } else if(this.props.hover) {
            buttonStyle = { border: '1px solid ' +this.props.textDefocus,  opacity: '.2'}
            squareStyle = { backgroundColor: this.props.textDefocus, opacity: '.5' }
        }

        let button = null;
        if(this.buttonItemRef.current && this.props.buttonHover){
            button = this.buttonItemRef.current.children;
        }

        if(button) {
            anime.timeline({loop: false})
            .add({
                targets: [button],
                translateY: [-20, 0],
                duraion: 2000,
                delay: (el, i) => 50 * i,
                easing: 'easeOutExpo'
            });
        }


        return (
            <div 
                ref={this.buttonItemRef}
                className={style.Button} 
                style={buttonStyle}
                onClick={(event) => this.props.buttonClick(event)}
                onMouseOver={(event) => this.props.mouseOver(event.target, '0px')}
                onMouseOut={(event) => this.props.mouseOut(event)} >
                    <div className={style.square} style={squareStyle}></div>
                    <div className={style.square} style={squareStyle}></div>
                    <div className={style.square} style={squareStyle}></div>
                    {/* <div style={barStyle} className={style.bar1}></div>
                    <div style={barStyle} className={style.bar2}></div>
                    <div style={barStyle} className={style.bar3}></div> */}
            </div>
        );
    };
};


const mapStateToProps = (state) => {
    return {
        primary: state.colors.primary,
        secondary: state.colors.secondary,
        textHighlight: state.colors.textHighlight,
        textDefocus: state.colors.textDefocus,
        hover: state.hover,
        buttonHover: state.buttonHover
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        buttonClick: (event) => dispatch({type: actionTypes.BUTTON_CLICK_HANDLER, payload: event}),
        mouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        mouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);