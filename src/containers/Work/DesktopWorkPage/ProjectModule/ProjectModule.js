import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { CSSTransitionGroup } from 'react-transition-group';
import Fade from 'react-reveal/Fade';

import PageLink from '../../../../components/UI/PageLink/PageLink';
import PageNav from '../../../../components/PageNav/PageNav';
import StackItem from '../StackItem/StackItem';
import Spinner from '../../../../components/UI/Spinner/Spinner';

import style from './ProjectModule.module.css';
import * as actionTypes from '../../../../store/actions/actionTypes';
// import * as actions from '../../../../store/actions/';

const ProjectModule = (props) => {
    const pageID = props.match.params.pathParam.replace(/([A-Z])/g, ' $1').trim();
    var textStyle1 = { color: props.defaultColors.primary };
    var textStyle2 = { color: props.colors.secondary };
    var dateItemStyle = { backgroundColor: props.defaultColors.primary, color: 'white' };
    var project = null;
    var nextProject = null;
    var page = null;

    var index = 0;
    var currentIndex = 0;
    var nextIndex = 0;
    var max = 0;


    for(var key in props.projects) {
        if(pageID === key) {
            
            project = props.projects[key];
            currentIndex = index;
            nextIndex = currentIndex+1;
        } else if(pageID.toUpperCase() === key) { // edge case project title is all uppercase
            project = props.projects[key];
            currentIndex = index;
            nextIndex = currentIndex+1;
        }
        index++;
        max++;
    }

    index = 0;
    for(key in props.projects) {
        if(index === currentIndex+1) {
            nextProject = props.projects[key];
            break;
        } else if(max-1 === currentIndex) { // catches overflow, if current index is last property of object i.e. max length
            nextProject = props.projects[key];
            nextIndex = 0;
            break;
        }
        index++;
    }


    
    // CHECKS IF PROPS HAVE LOADED IN
    if(project) {
        var imgs = [];
        for(var img of project.imgs) {
            imgs.push( <img className={style.ProjectModuleImg} key={img} src={img} alt={img} /> );
        }
        page = (
        <div className={style.ProjectModule}>
            <CSSTransitionGroup
            transitionName={{
                enter: style.titleAppear,
                enterActive: style.titleAppearActive,
                appear: style.titleAppear,
                appearActive: style.titleAppearActive,
            }}
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={300}>

                <h1 style={textStyle1}> { project.title.toUpperCase() } </h1>
            
            </CSSTransitionGroup>

            <CSSTransitionGroup
            transitionName={{
                appear: style.titleAppear,
                appearActive: style.stackAppearActive,
            }}
            transitionAppear={true}
            transitionAppearTimeout={1100}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={300}>

                <div className={style.StackContainer}>
                    <div className={style.DateItem}>  
                        <h5 style={textStyle2}>DATE</h5>
                        <p style={dateItemStyle}>{project.date}</p>
                    </div>
                    <StackItem 
                        stack={project.stack}
                        date={project.date}
                        primary={props.defaultColors.primary}
                        secondary={props.colors.secondary} />
                </div>

            </CSSTransitionGroup>

            <CSSTransitionGroup
            transitionName={{
                appear: style.descriptionApper,
                appearActive: style.descriptionAppearActive,
            }}
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={300}>
                <div className={style.ProjectModuleContainer}>
                    <p className={style.Description} style={textStyle1}> { project.description } </p>
                </div>

                <Fade bottom opposite>{ imgs }</Fade>
            </CSSTransitionGroup>
        </div>
        );
    } else {
        page = ( 
            <div className={style.ProjectModule}>
                <Spinner />
            </div>
        );
    }

    var nextTitle = '';
    if(nextProject) {
        nextTitle = new String(nextProject.title);
    }



    return (
        <div className={style.Wrapper} style={{ backgroundColor: props.colors.altColor }}>
            <PageNav pageType={pageID} linkType={'projectModule'} />
            <div className={style.ProjectModuleContainer}>
                { page }
                <div className={style.Footer}>
                    <div className={style.Dash} style={{backgroundColor: props.colors.primary}}></div>
                    <div className={style.NextProjectContainer}>
                        <h2 className={style.NextProject} style={textStyle1}>NEXT PROJECT</h2>
                        <a style={{textDecoration: 'none'}} 
                            href={`/work/${nextTitle.replace(' ','')}`}> 
                            <PageLink
                                key={nextTitle}
                                title={nextTitle} 
                                index={'0'+(nextIndex)}
                                primary={props.defaultColors.primary}
                                secondary={props.colors.primary} />
                        </a>
                    </div>
                </div>
            </div>


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
        resetState: () => dispatch({type: actionTypes.RESET_STATE}),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectModule));