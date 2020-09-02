import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import anime from 'animejs';
import style from './Header.module.css';
import * as actionTypes from '../../store/actions/actionTypes';

class Header extends Component {
    constructor(props) {
        super(props);
        this.titleRef = React.createRef();  
        this.descRef = React.createRef();
    }

    componentDidMount() {
        let titleItem = this.titleRef.current;
        let descItem = this.descRef.current;

        anime.timeline({loop: false})
        .add({
            targets: [titleItem, descItem],
            translateY: [-500, 0],
            opacity: {
                value: [0, 1],
                delay: 300,
                duration: 1500
            },
            scale: {
                value: [.9, 1],
                delay: 800,
                duraion: 500
            },
            duraion: 1000,
            delay: (el, i) => 30 * i,
            easing: 'easeOutExpo'
        });
    }

    render () {
        return (
            <Aux>
                <div className={style.Header} style={{ color: this.props.secondary }}>
                    <div ref={this.titleRef}>CHRISTIAN THOMAS</div>
                    <p ref={this.descRef}>FRONT-END DEVELOPER & GRAPHIC DESIGNER <br/> BASED IN DENVER, CO</p>
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        mouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        mouseOut: (event) => dispatch({type: actionTypes.NAV_MOUSEOUT_HANDLER, payload: event}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);