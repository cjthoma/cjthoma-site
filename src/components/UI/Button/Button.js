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
        var buttonStyle = { border: '1px solid ' +this.props.defaultColors.primary };
        var squareStyle = { backgroundColor: this.props.defaultColors.primary };
        var linkTo = null;

        if(this.props.linkType === 'projectModule') {
            linkTo = '/work'
        } else {
            linkTo = '/'
        }
        


        if(this.props.buttonHover && this.props.hover === '') {
            buttonStyle = { border: '1px solid ' +this.props.colors.secondary }
            squareStyle = { backgroundColor: this.props.colors.secondary }

        } else if(this.props.hover != null) {
            buttonStyle = { border: '1px solid ' +this.props.colors.textDefocus,  opacity: '.2' }
            squareStyle = { backgroundColor: this.props.colors.textDefocus, opacity: '.5' }
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
            <Link 
                to={linkTo}
                ref={this.buttonItemRef}
                className={style.Button} 
                style={buttonStyle}
                onClick={(event) => this.props.buttonClick(event)}
                onMouseOver={(event) => this.props.mouseOver(event.target, '0px')}
                onMouseOut={(event) => this.props.mouseOut(event)} >
                    <div className={style.square} style={squareStyle}></div>
                    <div className={style.square} style={squareStyle}></div>
                    <div className={style.square} style={squareStyle}></div>
            </Link>
        );
    };
};


const mapStateToProps = (state) => {
    return {
        primary: state.reducer.colors.primary,
        secondary: state.reducer.colors.secondary,
        textHighlight: state.reducer.colors.textHighlight,
        textDefocus: state.reducer.colors.textDefocus,
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