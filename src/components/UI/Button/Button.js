import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import anime from 'animejs';
import style from './Button.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';

class Button extends Component {
    constructor(props) {
        super(props);
        this.buttonItemRef = React.createRef();  
    }

    componentDidMount() {
        // let button = this.buttonItemRef.current.children;
        // var squares = []
        // squares.push(button[0],button[1],button[2])

        // anime.timeline({loop: false})
        // .add({
        //     targets: [squares],
        //     translateY: [-20, 0],
        //     duraion: 2000,
        //     delay: (el, i) => 50 * i,
        //     easing: 'easeOutExpo'
        // });
    }

    render () {
        var buttonStyle = { border: '1px solid ' +this.props.defaultColors.primary };
        var squareStyle = { backgroundColor: this.props.defaultColors.primary };
        var circleStyle = { 
            backgroundColor: this.props.colors.primary,
            width: '0px',
            height: '0px',
        }
        var linkTo = null;

        if(this.props.linkType === 'projectModule') {
            linkTo = '/work'
        } else {
            linkTo = '/'
        }
        

        // BUTTON HOVER STYLES
        if(this.props.buttonHover && this.props.hover === '') {
            buttonStyle = { border: '1px solid ' +this.props.colors.altColor }
            squareStyle = { backgroundColor: this.props.colors.altColor }
            circleStyle = { 
                backgroundColor: this.props.defaultColors.primary,
                width: '90px',
                height: '90px',
            }
            let button = null;
            var squares = []
            if(this.buttonItemRef.current && this.props.buttonHover){
                button = this.buttonItemRef.current.children;
                squares.push(button[0],button[1],button[2])
            }
    
            if(button) {
                anime.timeline({loop: false})
                .add({
                    targets: [squares],
                    translateY: [-20, 0],
                    duraion: 2000,
                    delay: (el, i) => 50 * i,
                    easing: 'easeOutExpo'
                });
            }
        }
        // else if(this.props.hover != null) {
        //     buttonStyle = { border: '1px solid ' +this.props.colors.textDefocus,  opacity: '.2' }
        //     squareStyle = { backgroundColor: this.props.colors.textDefocus, opacity: '.5' }
        // }

        return (
            <Link 
                to={linkTo}
                onClick={(event) => {
                    window.scrollTo(0, 0)
                    this.props.buttonClick(event)
                }}
                ref={this.buttonItemRef}
                className={style.Button} 
                style={buttonStyle}
                onMouseOver={(event) => this.props.mouseOver(event.target, '0px')}
                onMouseOut={(event) => this.props.mouseOut(event)} >
                    <div className={style.square} style={squareStyle}></div>
                    <div className={style.square} style={squareStyle}></div>
                    <div className={style.square} style={squareStyle}></div>
                    <div className={style.circle} style={circleStyle}></div>
            </Link>
        );
    };
};


const mapStateToProps = (state) => {
    return {

        defaultColors: { ...state.reducer.defaultColors },
        colors: { ...state.reducer.altColors },
        hover: state.reducer.hover,
        buttonHover: state.reducer.buttonHover
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