import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './ColorSelector.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions/index';

class ColorSelector extends Component {
    state = {
        input: this.props.colorType,
        title: this.props.title,
        isHex: true
    }

    inputOnChangeHandler = (event) => {
        var RegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i; 
        if(RegExp.test(event.target.value)){
            this.setState({
                isHex: true,
                input: event.target.value
            });
        } else {
            this.setState({
                isHex: false,
                input: this.state.input
            });
        }
    }

    render () {
        let buttonStyleList = null;
        let boxHighlightStyleList = null;
        let colorSelectorTitle = null;

        // if hex is valid
        if(this.state.isHex){
            colorSelectorTitle = <h1 style={{color: this.props.colorType}}>{this.props.title}</h1>
            buttonStyleList = this.state.input ? { backgroundColor: this.state.input } : { backgroundColor: this.props.colorType }
            boxHighlightStyleList = this.state.input ? { backgroundColor: this.state.input } : { backgroundColor: this.props.colorType }
        } else { // if hex is not valie
            buttonStyleList = { pointerEvents: 'none', backgroundColor: 'red', color: this.props.colorType} 
            colorSelectorTitle = <h1 style={{color: 'red'}}>NOT A VALID HEX CODE (ie -> #1234567)</h1>
            boxHighlightStyleList = { backgroundColor: 'red' }
        }
        return (
            <div className={style.ColorSelector}>
                <div className={style.BoxHighlight} style={boxHighlightStyleList}></div>
                <div className={style.InputContainer}>
                { colorSelectorTitle }
                    <input onChange={(event) => this.inputOnChangeHandler(event)} defaultValue={this.props.colorType} type={'text'} style={{backgroundColor: this.props.colorType}}></input>
                </div>
    
                <button onClick={
                    () => {
                        let previosColors = null;
                        let colorType = null;
                        if(this.props.alt) {
                            previosColors = this.props.altColors;
                            colorType = this.state.title.replace(/^alt-/, '');
                        } else {
                            previosColors = this.props.colors;
                            colorType = this.state.title;
                        }

                        if(this.state.input) {
                            alert('Color Updated!' +'\n' 
                                +'[' +this.props.colors[colorType] +'] => [' +[this.state.input] +']')

                            return this.props.configColor(this.state.input, this.state.title, previosColors)
                        } else {
                            alert('Invalid or null type, plase try again.');
                            return;
                        }
                    } 
                    } className={style.Button} style={buttonStyleList}>Send</button>
            </div>
        )
    }
}

// this.this.props.configColor(event)


const mapStateTothisProps = (state) => {
    return {
        colors: state.colors,
        altColors: { ...state.altColors }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        configColor: (hexValue, colorType, previousColors) => dispatch(actions.configColor(hexValue, colorType, previousColors)),
    }
}

export default connect(mapStateTothisProps, mapDispatchToProps)(ColorSelector);
