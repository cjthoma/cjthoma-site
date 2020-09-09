import React from 'react';
import { connect } from 'react-redux';

import Project from './Project/Project';
import style from './Work.module.css';

const Work = (props) => {
    let projects = [];

    for(let key in props.projects) {
        let stack = [];
        let imgs = [];
        for(let s in props.projects[key].stack) {
            stack.push(props.projects[key].stack[s])
        }

        for(let i in props.projects[key].imgs) {
            imgs.push(props.projects[key].imgs[i])
        }

        projects.push (
            <Project 
            key={props.projects[key].title}
            title={props.projects[key].title} 
            description={props.projects[key].description} 
            stack={stack}
            date={props.projects[key].date}
            index={1}
            imgs={imgs}
            primary={props.secondary}
            secondary={props.primary} />
        );
    }


    return (
        <div className={style.Work}>
            { projects.reverse() }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        projects: state.reducer.projects
    }
}

export default connect(mapStateToProps)(Work);