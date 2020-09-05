import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Layout from '../../containers/Layout/Layout';

import ColorSelector from './ColorSelector/ColorSelector';
import NewProject from './NewProject/NewProject';


import style from './Config.module.css';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';
import { render } from 'react-dom';

class Config extends Component {

    componentDidMount() {
        this.props.fetchInitState();
        this.props.setHover('ABOUT');
    }

    setHover = () => {

    }

    render() {
        return (
            <div className={style.Config}>
            <h1>HOME BUTTON</h1>

            <Layout mask={{backgroundColor: this.props.colors.altColor, pointerEvents: 'none'}}
            primary={this.props.colors.secondary} 
            secondary={this.props.colors.primary} />

            <Layout mask={{WebkitClipPath: 'ellipse(100px 1000px at center)', clipPath: 'inset(0% 50% 0% 100%)',backgroundColor: this.props.altColors.altColor, pointerEvents: 'none'}}
            primary={this.props.colors.primary} 
            secondary={this.props.colors.secondary} />

            <h1>COLOR PALLETTE SELECTION</h1>
                <h6>DEFAULT COLOR SCHME</h6>
                <div className={style.ColorSelectorContainer}>
                    <ColorSelector colorType={this.props.colors.primary} title={'primary'}></ColorSelector>
                    <ColorSelector colorType={this.props.colors.secondary} title={'secondary'}></ColorSelector>
                    <ColorSelector colorType={this.props.colors.altColor} title={'altColor'}></ColorSelector>
                    <ColorSelector colorType={this.props.colors.textColor} title={'textColor'}></ColorSelector>
                    <ColorSelector colorType={this.props.colors.textHighlight} title={'textHighlight'}></ColorSelector>
                    <ColorSelector colorType={this.props.colors.textDefocus} title={'textDefocus'}></ColorSelector>
                </div>
                <h6>ALTERNATE COLOR SCHME</h6>
                <div className={style.ColorSelectorContainer}>
                    <ColorSelector colorType={this.props.altColors.primary} title={'alt-primary'} alt={true}></ColorSelector>
                    <ColorSelector colorType={this.props.altColors.secondary} title={'alt-secondary'} alt={true}></ColorSelector>
                    <ColorSelector colorType={this.props.altColors.altColor} title={'alt-altColor'} alt={true}></ColorSelector>
                </div>
                <h1>Reveal Project Button</h1>
                <NewProject></NewProject>
    
            </div>
        )
    }
    
}


const mapStateToProps = (state) => {
    return {
        colors: { ...state.colors },
        altColors: { ...state.altColors },
        hover: state.hover
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchInitState: () => dispatch(actions.fetchInitState()),
        setHover: (hoverSelection) => dispatch(actions.setHover(hoverSelection))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);