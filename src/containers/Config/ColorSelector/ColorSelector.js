import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './ColorSelector.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions/index';

class ColorSelector extends Component {
    state = {
        input: this.props.colorType,
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
            buttonStyleList = this.state.input ? { backgroundColor: this.state.input, color: 'white'} : { backgroundColor: this.props.colorType, color: 'white' }
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
                    <input maxlength="7" onChange={(event) => this.inputOnChangeHandler(event)} defaultValue={this.props.colorType} type={'text'} style={{backgroundColor: this.props.colorType}}></input>
                </div>
    
                <button onClick={ // on click handler
                    () => {
                        let previosColors = null;
                        let colorType = this.props.title;

                        if(this.props.alt) {
                            previosColors = this.props.altColors;
                            colorType = this.props.title.replace(/^a/, '')
                        } else {
                            console.log('def colors')
                            previosColors = this.props.colors;
                        }

                        if(this.state.input) {
                                setTimeout(() => {
                                    alert('Color Updated!' +'\n' 
                                    +'[' +this.props.colors[colorType] +'] => [' +[this.state.input] +']')
                                    this.props.fetchInitState()
                                    
                                    setTimeout(() => {
                                        if(this.props.alt) {
                                            this.props.setHover('WORK');
                                            this.props.navMouseOver({ event: { textContent: "WORK" }, maskSize: '0px' });
                                        }
                                    }, 2000)
                                }, 100)

                            return this.props.configColor(this.state.input, this.props.title, previosColors)
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


const mapStateTothisProps = (state) => {
    return {
        colors: state.colors,
        altColors: { ...state.altColors }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        configColor: (hexValue, colorType, previousColors) => dispatch(actions.configColor(hexValue, colorType, previousColors)),
        navMouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        setHover: (hoverSelection) => dispatch(actions.setHover(hoverSelection)),
        fetchInitState: () => dispatch(actions.fetchInitState()),
    }
}

export default connect(mapStateTothisProps, mapDispatchToProps)(ColorSelector);
