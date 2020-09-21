import React from 'react';
import { connect } from 'react-redux';

import Fade from 'react-reveal/Fade';
import style from './StackItem.module.css';
import * as actionTypes from '../../../../../store/actions/actionTypes';

const StackItem = (props) => {
    let stackArr = props.stack;
    let stackItems = [];
    let stackItemStyle = { backgroundColor: props.primary, color: 'white' };
    let stackHoverStyle = { 
        backgroundColor: props.primary, 
        color: 'white', 
        transform: 'translate3d(0px, 0vh, 0px) scale3d(1.155, 1.155, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg)'
    }

    let stackClickedStyle = { 
        backgroundColor: props.primary, 
        color: 'white', 
        transform: 'translate3d(0px, 0vh, 0px) scale3d(1.155, 1.155, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg)'
    }


    if(props.stackClickItem) { // If a stack item is selected
        for(let i = 0; i < stackArr.length; i++) { // Checks projects stack for selected stack item
            if(props.stackClickItem === stackArr[i]) {
                stackItems.push(
                    <p 
                    key={stackArr[i]+props.date}
                    style={stackClickedStyle} 
                    onClick={(event) => props.stackClick(event.target)}
                    onMouseEnter={(event) => props.mouseOver(event.target, '50px')} 
                    onMouseOut={(event) => props.mouseOut(event)}>{stackArr[i]}</p>
                );
            } else if(props.hover === stackArr[i]){
                stackItems.push(
                    <p 
                    key={stackArr[i]+props.date}
                    style={stackHoverStyle} 
                    onClick={(event) => props.stackClick(event.target)}
                    onMouseEnter={(event) => props.mouseOver(event.target, '50px')} 
                    onMouseOut={(event) => props.mouseOut(event)}>{stackArr[i]}</p>
                );
            } else if(props.hover) {
                stackItemStyle = { 
                    backgroundColor: props.textDefocus, 
                    color: 'white', opacity: '.2', 
                    textDecoration: 'line-through',
                    transform: 'translate3d(0px, 0vh, 0px) scale3d(0.8, 0.8, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg)'
                };
                stackItems.push(
                    <p 
                    key={stackArr[i]+props.date}
                    style={stackItemStyle} 
                    onClick={(event) => props.stackClick(event.target)}
                    onMouseEnter={(event) => props.mouseOver(event.target, '50px')} 
                    onMouseOut={(event) => props.mouseOut(event)}>{stackArr[i]}</p>
                );
            } else {
                stackItemStyle = { 
                    backgroundColor: props.textDefocus, 
                    color: 'white', opacity: '.2', 
                    textDecoration: 'line-through',
                    transform: 'translate3d(0px, 0vh, 0px) scale3d(0.8, 0.8, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg)' 
                };
                stackItems.push(
                    <p 
                    key={stackArr[i]+props.date}
                    style={stackItemStyle} 
                    onClick={(event) => props.stackClick(event.target)}
                    onMouseEnter={(event) => props.mouseOver(event.target, '50px')} 
                    onMouseOut={(event) => props.mouseOut(event)}>{stackArr[i]}</p>
                );
            }
        };
    } else { // If a stack item is NOT selected
        for(let i = 0; i < stackArr.length; i++) {
            if(props.hover === stackArr[i]){
                stackItems.push(
                    <p 
                    key={stackArr[i]+props.date}
                    style={stackHoverStyle} 
                    onClick={(event) => props.stackClick(event.target)}
                    onMouseEnter={(event) => props.mouseOver(event.target, '50px')} 
                    onMouseOut={(event) => props.mouseOut(event)}>{stackArr[i]}</p>
                );
            } else if(props.hover) {
                stackItemStyle = { backgroundColor: props.textDefocus, color: 'white', opacity: '.2' };
                stackItems.push(
                    <p 
                    key={stackArr[i]+props.date}
                    style={stackItemStyle} 
                    onClick={(event) => props.stackClick(event.target)}
                    onMouseEnter={(event) => props.mouseOver(event.target, '50px')} 
                    onMouseOut={(event) => props.mouseOut(event)}>{stackArr[i]}</p>
                );
            } else {
                stackItems.push(
                    <p 
                    key={stackArr[i]+props.date}
                    style={stackItemStyle} 
                    onClick={(event) => props.stackClick(event.target)}
                    onMouseEnter={(event) => props.mouseOver(event.target, '50px')} 
                    onMouseOut={(event) => props.mouseOut(event)}>{stackArr[i]}</p>
                );
            }
        };
    }
    
    return (
        <Fade bottom>
        <div className={style.StackItem}>
            {/* <div className={style.DateItemContainer}>
                <h6>DATE</h6>
                <h1>{props.date}</h1>
            </div> */}
            <div>
                <h6>STACK</h6>
                <div className={style.StackItemContainer}>{stackItems}</div>
            </div>
        </div>
        </Fade>
    );
};

const mapStateToProps = (state) => {
    return {
        hover: state.hover,
        stackClickItem: state.reducer.stackClickItem,
        textDefocus: state.reducer.colors.textDefocus,
        textColor: state.reducer.colors.textColor
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        mouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        mouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
        stackClick: (event) => dispatch({type: actionTypes.STACK_CLICK_HANDLER, payload: event})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StackItem);