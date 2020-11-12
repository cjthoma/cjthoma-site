import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import PageNav from '../../../../../components/PageNav/PageNav';
import Aux from '../../../../../hoc/Aux';

import style from './ProjectModule.module.css';
import * as actionTypes from '../../../../../store/actions/actionTypes';
import * as actions from '../../../../../store/actions/';

const ProjectModule = (props) => {
    // console.log(props.projects)
    const pageID = props.match.params.pathParam.replace(/([A-Z])/g, ' $1').trim();
    var project = null;
    var page = null;
    for(var key in props.projects) {
        if(pageID === key) {
            project = props.projects[key];
        } else if(pageID.toUpperCase() === key) { // edge case project title is all uppercase
            project = props.projects[key];
        }
    }
    console.log(project)

    if(project) {
        page = (
        <div>
            <h1> { pageID } </h1>
            <p> { project.description } </p>
        </div>
        )
    } else {
        page = (
            <h1>Loading</h1>
        )
    }
    return (
        <div className={style.ProjectModule}>
            <PageNav pageType={pageID} linkType={'projectModule'} />
            { page }
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        projects: state.reducer.projects,
        defaultColors: { ...state.reducer.defaultColors },
        colors: { ...state.reducer.altColors },
        mask: { ...state.reducer.mask},
        navFocusItem: state.reducer.navFocusItem
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        mouseMove: (event) => dispatch({type: actionTypes.MOUSE_MOVE, payload: event}),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectModule));