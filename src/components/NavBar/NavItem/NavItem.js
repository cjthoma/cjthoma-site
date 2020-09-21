import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Aux from '../../../hoc/Aux';
import anime from 'animejs';
import style from './NavItem.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';

class NavItem extends Component {
    constructor(props) {
        super(props);
        this.navItemRef = React.createRef();  
        this.configNav = React.createRef();  
    }

    componentDidMount() {
        let navIndex = this.navItemRef.current.lastChild;
        let navItem = this.navItemRef.current.firstChild;
        navItem.innerHTML = navItem.textContent.replace(/\S/g, (data) => '<p>' +data +'</p>');

        anime.timeline({loop: false})
        .add({
            targets: [navItem, navIndex, navItem.children],
            translateY: [-200, 0],
            opacity: [0 , 1],
            scale: {
                value: [.9, 1],
                delay: 800,
                duraion: 500
            },
            delay: (el, i) => 50 * i,
            easing: 'easeOutExpo'
        });
    }

    render () {
        let item = null;
        let linkDesination = new String(this.props.title);
        let navHoverStyleList = {
            color: this.props.secondary,
            transform: 'scale(1.1)',
            letterSpacing: '-3px',
            transition: 'color 1s ease, opacity 1s ease, transform 1.5s ease, letter-spacing 1s ease-in-out'
        }

        let indexHoverStyleList = {
            color: this.props.secondary,
            transform: "translateX(15px)",
            transition: 'color 1s ease, opacity 1s ease, transform 1s ease'
        }

        let navNormalStyleList = {
            color: this.props.secondary,
            letterSpacing: '3px',
            transition: 'color 1s ease, opacity 1s ease, letter-spacing 1s ease-in-out'
        }

        let navDefocusStyleList = {
            color: this.props.secondary,
            letterSpacing: '3px',
            color: 'rgba(250, 174, 123, 0.2)', 
        }

    if(this.props.hover === this.props.title){ // If this.props.hover current nav item is hovered, hover style applied
        item = (
                <div ref={this.navItemRef} className={style.NavItem} style={{color: this.props.secondary}}>
                    <Link
                        to={`/${linkDesination.toLowerCase()}`}
                        style={navHoverStyleList}
                        className={style.NavTitle}
                        // onClick={(event) => this.props.navClick(event.target.parentNode)}
                        onMouseOver={(event) => this.props.navMouseOver(event, '100px')}
                        onMouseOut={(event) => this.props.navMouseOut(event, '100px')}>{this.props.title} 
                    </Link>
                    <h6 style={indexHoverStyleList}>{this.props.navNum}</h6>
                </div>
        )
    } else if(this.props.hover) { // Nav Item is not actively being hovered over during a mouse over event fade opacity
        item = (
                    <div ref={this.navItemRef} className={style.NavItem} style={{color: this.props.secondary}}>
                    <Link 
                        to={`/${linkDesination.toLowerCase()}`}
                        style={navDefocusStyleList} 
                        className={style.NavTitle}
                        // onClick={(event) => this.props.navClick(event.target.parentNode)}
                        onMouseOver={(event) => this.props.navMouseOver(event , '100px')}
                        onMouseOut={(event) => this.props.navMouseOut(event)}>{this.props.title}
                    </Link>
                    <h6 style={{color: 'rgba(250, 174, 123, 0.2)'}}>{this.props.navNum}</h6>
                </div>
        );
    } else { // else nav item is displayed normally
        item = (
                <div ref={this.navItemRef} className={style.NavItem} style={{color: this.props.secondary}}>
                    <Link 
                        to={`/${linkDesination.toLowerCase()}`}
                        style={navNormalStyleList}
                        className={style.NavTitle}
                        // onClick={(event) => this.props.navClick(event.target.parentNode)}
                        onMouseOver={(event) => this.props.navMouseOver(event.target.parentNode, '100px')}
                        onMouseOut={(event) => this.props.navMouseOut(event.target.parentNode)}>{this.props.title}
                    </Link>
                    <h6>{this.props.navNum}</h6>
                </div>
            )
        }

        return (
            <Aux>
                {item}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        hover: state.reducer.hover,
        configPage: state.reducer.configPage,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        navClick: (event) => dispatch({type: actionTypes.NAV_CLICK_HANDLER, payload: event}),
        navMouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        navMouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavItem);