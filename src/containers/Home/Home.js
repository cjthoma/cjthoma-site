import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Layout from '../../components/Layout/Layout';
import style from './Home.module.css';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

class Home extends Component {
    constructor(props) {
        super(props);
        // this.canvasRef = React.createRef();  
    }

    componentDidMount() {
        this.props.resetState()
    }

    render() {
        let home = null;
        // Serves page without mask for mobile version (page < 400px)
        // switch this check to if touch events maybe?
        if(window.innerWidth > 500) {
            home = (
                <div className={style.Home} onMouseMove={(event) => this.props.mouseMove(event)} onScroll={(event) => this.props.onPageScroll(event.target)}>
                <Layout 
                    primary={this.props.colors.secondary} 
                    secondary={this.props.colors.primary}
                    altColor={this.props.colors.altColor} />

                <Layout mask={this.props.mask} // Top Layout Layer recieves mask (top in that it is rendered last and is on the top of the stack)
                    primary={this.props.colors.primary} 
                    secondary={this.props.colors.secondary} />
                </div>
            );
        } else {
            home = (
                <div className={style.Home} onMouseMove={(event) => this.props.mouseMove(event)} onScroll={(event) => this.props.onPageScroll(event)}>
                <Layout 
                    primary={this.props.colors.secondary} 
                    secondary={this.props.colors.primary}
                    altColor={this.props.colors.altColor} />
                </div>
            );
        }



        return (
        <Aux>
            { home }
            {/* <Section /> */}
        </Aux>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        colors: { ...state.reducer.colors },
        mask: { ...state.reducer.mask},
        navFocusItem: state.reducer.navFocusItem
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetState: () => dispatch({type: actionTypes.RESET_STATE}),
        mouseMove: (event) => dispatch({type: actionTypes.MOUSE_MOVE, payload: event}),
        onPageScroll: (event) => dispatch({type: actionTypes.ON_SCROLL_HANDLER, payload: event}),
        fetchInitState: () => dispatch(actions.fetchInitState()),
        fetchProjects: () => dispatch(actions.fetchProjects()),
        authCheckState: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);