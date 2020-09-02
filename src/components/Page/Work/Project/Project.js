import React, { Component } from 'react';
import { connect } from 'react-redux';

import StackItem from './StackItem/StackItem';

import Fade from 'react-reveal/Fade';
import style from './Project.module.css';
import * as actionTypes from '../../../../store/actions/actionTypes';

class Project extends Component {

    render () {
        let stackArr = this.props.stack;
        let projectStyle = { color: this.props.primary };

        
        if(this.props.stackClickItem) {
            projectStyle = { display: 'none' };

            for(let i = 0; i < stackArr.length; i++){ // Checks projects stack for selected stack item if found display
                if(this.props.stackClickItem === stackArr[i]) {
                    projectStyle = { color: this.props.primary, display: 'show' }
                }
            }
        }

        let imgs = [];
        
        for(let i in this.props.imgs) {
            imgs.push(
                <img key={this.props.imgs[i]} src={this.props.imgs[i]} alt='img' />
            );
        }
        return (
            <div style={projectStyle} className={style.Project}>
                    <Fade bottom cascade>
                    <div className={style.Index}>0{this.props.index}</div>
                    <div className={style.Dash} style={{backgroundColor: 'white'}}></div>
                    <h1 >{this.props.title}</h1>
                    </Fade>

                    
                    <StackItem 
                        stack={this.props.stack}
                        date={this.props.date}
                        primary={this.props.primary}
                        secondary={this.props.secondary} />
                        
                    <Fade bottom>
                    <p>{this.props.description}</p>
                    </Fade>

                    <Fade>
                    <div 
                        className={style.imgContainer} 
                        style={{backgroundColor: this.props.primary}} 
                        onMouseEnter={(event) => this.props.mouseOver(event.target, '300px')} 
                        onMouseOut={(event) => this.props.mouseOut(event)}>
                        {imgs}
                    </div>
                    </Fade>

            </div>
        );
    }
};


const mapStateToProps = (state) => {
    return {
        stackClickItem: state.stackClickItem,
        textColor: state.colors.textColor
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        mouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        mouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);