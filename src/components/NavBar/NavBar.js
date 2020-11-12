import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavItem from './NavItem/NavItem';
import anime from 'animejs';
import style from './NavBar.module.css';
// import * as actionTypes from '../../store/actions';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.navDashRef1 = React.createRef();  
        this.navDashRef2 = React.createRef();
    }

    componentDidMount() {
        anime.timeline({loop: false})
        .add({
            targets: [this.navDashRef1.current, this.navDashRef2.current],
            opacity: {
                value: [0, 1],
            },
            scale: {
                value: [.5, 1],
                delay: 500,
                duraion: 500
            },
            delay: 400,
            duration: 1000,
            easing: 'easeInOutQuad'
        })
    }
    
    render () {
        let transformConfig = null;
        
        if(this.props.mouseY > 400 && this.props.mouseY < 600 && window.innerWidth > 900 && window.innerWidth < 1920){
            transformConfig = { transform: "translateX("+(-(this.props.mouseX-(window.innerWidth/1.75)))+"px)"} ;
        } else if(window.innerWidth > 900) {
            transformConfig = { transform: "translateX(100px)" };
        }

        let dashStyle = { backgroundColor: this.props.secondary };
        let dashStyle2 = { backgroundColor: this.props.secondary };

        switch(this.props.navHover){
            case('WORK'):
                dashStyle = { backgroundColor: this.props.secondary };
                dashStyle2 = { backgroundColor: this.props.secondary };
                break;

            case('ABOUT'):
                dashStyle = { backgroundColor: this.props.secondary };

                //this dash does not recieve highlight
                dashStyle2 = { opcaity: '.2' };
                break;

            case('CONTACT'):
                dashStyle2 = { backgroundColor: this.props.secondary };
                //this dash does not recieve highlight
                dashStyle = { opcaity: '.2', transition: 'background-color 1s ease, opacity 12s ease' };
                break;

            //button hover case
            case(''):
                dashStyle = { opcaity: '.2', transition: 'background-color 1s ease, opacity 12s ease' };
                dashStyle2 = { opcaity: '.2', transition: 'background-color 1s ease, opacity 12s ease' };
                break;

            default:
                break;
        }

        return (
            <div className={style.NavBar} style={transformConfig}>
                <NavItem 
                    title={'ABOUT'} 
                    navNum={'00'}
                    primary={this.props.primary} 
                    secondary={this.props.secondary} />
                <div className={style.NavDash} style={dashStyle} ref={this.navDashRef1}></div>
                <NavItem 
                    title={'WORK'} 
                    navNum={'01'}
                    primary={this.props.primary} 
                    secondary={this.props.secondary} />
                <div className={style.NavDash} style={dashStyle2} ref={this.navDashRef2}></div>
                <NavItem 
                    title={'CONTACT'} 
                    navNum={'02'}
                    primary={this.props.primary} 
                    secondary={this.props.secondary} />
            </div>
        );
    }
};



const mapStateToProps = (state) => {
    return {
        mouseX: state.reducer.mousePosX,
        mouseY: state.reducer.mousePosY,
        navHover: state.reducer.hover
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // mouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        // mouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);