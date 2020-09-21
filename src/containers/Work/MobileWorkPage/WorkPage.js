import React, { Component } from 'react';
import { connect } from 'react-redux';

import Project from './Project/Project';
import style from './WorkPage.module.css';
import * as actions from '../../../store/actions';

class WorkPage extends Component {
    render() {
        let workStyle = null;
        // checks if layer should recieve mask layer or default layer styles
        if(this.props.mask) {
            workStyle = { ...this.props.mask, backgroundColor: this.props.colors.primary, WebkitTextStroke: '1px ' +this.props.secondary, color: 'transparent', overflowX: 'hidden' };
        } else if(window.innerWidth > 425) {
            workStyle = { backgroundColor: this.props.colors.altColor, WebkitTextStroke: '1px ' +this.props.secondary, color: 'transparent',  };
        } else {
            workStyle = { backgroundColor: this.props.colors.altColor, WebkitTextStroke: '1px ' +this.props.secondary, color: 'transparent',  };
        }


        let projects = [];

        for(let key in this.props.projects) {
            let stack = [];
            let imgs = [];
            for(let s in this.props.projects[key].stack) {
                stack.push(this.props.projects[key].stack[s])
            }
    
            for(let i in this.props.projects[key].imgs) {
                imgs.push(this.props.projects[key].imgs[i])
            }
    
            projects.push (
                <Project 
                    key={this.props.projects[key].title}
                    title={this.props.projects[key].title} 
                    description={this.props.projects[key].description} 
                    stack={stack}
                    date={this.props.projects[key].date}
                    index={1}
                    imgs={imgs}
                    primary={this.props.secondary}
                    secondary={this.props.primary} />
            );
        }

        return (
            <div style={workStyle} className={style.WorkPage}>
                { projects.reverse() }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        projects: state.reducer.projects,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchInitState: () => dispatch(actions.fetchInitState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkPage);