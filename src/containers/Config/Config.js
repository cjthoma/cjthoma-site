import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

import ColorSelector from './ColorSelector/ColorSelector';
import NewProject from './NewProject/NewProject';

import style from './Config.module.css';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

class Config extends Component {
    constructor(props) {
        super(props);
        this.navDefRef = React.createRef();  
        this.navAltRef = React.createRef();  
        this.navTxtRef = React.createRef();  
    }

    state = {
        navFocusItem: 'DEFAULT',
        hover: 'WORK'
    }

    componentDidMount() {
        this.props.authCheckState()
        this.props.fetchInitState();
    }

    onClickHandler = (event) => {
        this.setState({
            navFocusItem: event.target.textContent
        })
    }

    render() {
        let selectedNavDef = { color: 'white' }
        let selectedNavTxt = { color: 'white' }
        let selectedNavAlt = { color: 'white' }

        let colorSelector = null;
        let setHoverState = {
            event: {
                textContent: "WORK"
            },
            maskSize: '0px'
        }

        switch(this.state.navFocusItem) {
            case 'DEFAULT': {
                selectedNavDef = { color: 'red' }
                colorSelector = (
                    <div className={style.ColorSelectorContainer}>
                    <ColorSelector key={"primary-1"} colorType={this.props.colors.primary} title={'primary'}></ColorSelector>
                    <ColorSelector key={"secondary-1"} colorType={this.props.colors.secondary} title={'secondary'}></ColorSelector>
                    <ColorSelector key={"alt-1"} colorType={this.props.colors.altColor} title={'altColor'}></ColorSelector>
                    </div>
                )
                break;
            }

            case 'TEXT': {
                selectedNavTxt = { color: 'red' }
                colorSelector = (
                    <div className={style.ColorSelectorContainer}>
                    <ColorSelector key={"textColor"} colorType={this.props.colors.textColor} title={'textColor'}></ColorSelector>
                    <ColorSelector key={"textHighlight"} colorType={this.props.colors.textHighlight} title={'textHighlight'}></ColorSelector>
                    <ColorSelector key={"textDefocus"} colorType={this.props.colors.textDefocus} title={'textDefocus'}></ColorSelector>
                    </div>
                )
                break;
            }

            case 'ALTERNATE': {
                selectedNavAlt = { color: 'red' }
                colorSelector = (
                    <div className={style.ColorSelectorContainer}>
                    <ColorSelector key={"alt-primary"} colorType={this.props.altColors.primary} title={'alt-primary'} alt={true}></ColorSelector>
                    <ColorSelector key={"alt-secondary"} colorType={this.props.altColors.secondary} title={'alt-secondary'} alt={true}></ColorSelector>
                    <ColorSelector key={"alt-altColor"} colorType={this.props.altColors.altColor} title={'alt-altColor'} alt={true}></ColorSelector>
                    </div>
                )
                break;
            }

            default: {
                colorSelector = <p>something went wrong...</p>
                break;
            }
        }

        
        let authRedirect = null
        if(!(this.props.isAuthenticated)) {
            authRedirect = <Redirect to="/admin-login" />
        }

        return (
            <div className={style.Config}>
            { authRedirect }
            <h1>HOME BUTTON</h1>

            <h1>COLOR PALLETTE SELECTION</h1>
            <div className={style.PageStylrContainer}>
                <div className={style.ColorSelectorContainer}>
                    <nav>
                        <h6 
                            ref={this.navDefRef}
                            style={selectedNavDef} 
                            onClick={(event) => {
                                this.onClickHandler(event);
                                this.props.setHover(null);
                                this.props.navMouseOut(setHoverState);
                            }}>DEFAULT</h6>
                        <h6 
                            ref={this.navTxtRef}
                            style={selectedNavTxt} 
                            onClick={(event) => {
                                this.onClickHandler(event);
                                this.props.setHover(null);
                                this.props.navMouseOut(setHoverState);
                            }}>TEXT</h6>
                        <h6 
                            ref={this.navAltRef}
                            style={selectedNavAlt}  
                            onClick={(event) =>{
                                this.onClickHandler(event);
                                this.props.setHover('WORK');
                                this.props.navMouseOver(setHoverState);
                            }}>ALTERNATE</h6>
                    </nav>
                    { colorSelector }
                 </div> {/* COLOR SELECTOR CONTAINER END */}

                <div className={style.LayoutContainer}>
                    <h5>BACKGROUND</h5>
                    <Layout mask={{backgroundColor: this.props.colors.altColor, pointerEvents: 'none', transform: 'scale(.5)'}}
                    primary={this.props.colors.secondary} 
                    secondary={this.props.colors.primary} />

                    <div style={{zIndex: '1', width: '1px', height: '400px', backgroundColor: this.props.colors.primary, position: 'relative', left: '-28px', bottom: '-155px'}}></div>
                    
                    <h5>MASK</h5>
                    <Layout mask={{ WebkitClipPath: 'inset(0% 0% 0% 50%)', clipPath: 'inset(0% 0% 0% 50%)',backgroundColor: this.props.altColors.altColor, pointerEvents: 'none', transform: 'scale(.5)'}}
                    primary={this.props.colors.primary} 
                    secondary={this.props.colors.secondary} />
                </div> {/* LAYOUT CONTAINER END */}
            </div>

            <h1>ADD NEW PROJECT</h1>
            <NewProject></NewProject>

            <h1>EDIT PROJECT</h1>

            </div> /* PAGE CONTAINER END */
        )
    }
    
}


const mapStateToProps = (state) => {
    return {
        colors: { ...state.reducer.colors },
        altColors: { ...state.reducer.altColors },
        hover: state.reducer.hover,
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchInitState: () => dispatch(actions.fetchInitState()),
        setHover: (hoverSelection) => dispatch(actions.setHover(hoverSelection)),
        navMouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        navMouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
        authCheckState: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);