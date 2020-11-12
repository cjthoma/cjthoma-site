import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import style from './DesktopWorkPage.module.css';
import Aux from '../../../hoc/Aux';
import { connect } from 'react-redux';
import ProjectContainer from './ProjectContainer/ProjectContainer';

class ProjectsContainer extends Component {
    render () {
        let containerStyle = null;
        // checks if layer should recieve mask layer or default layer styles
        if(this.props.mask) {
            containerStyle = { ...this.props.mask, backgroundColor: this.props.colors.primary, WebkitTextStroke: '1px ' +this.props.secondary, color: 'transparent', overflowX: 'hidden' };
        } else if(window.innerWidth > 425) {
            containerStyle = { backgroundColor: this.props.colors.altColor, WebkitTextStroke: '1px ' +this.props.secondary, color: 'transparent',  };
        } else {
            containerStyle = { backgroundColor: this.props.colors.altColor, WebkitTextStroke: '1px ' +this.props.secondary, color: 'transparent',  };
        }


        let projects = [];
        let index = 0;

        for(var key in this.props.projects) {
            let stack = [];
            let imgs = [];
            for(var s in this.props.projects[key].stack) {
                stack.push(this.props.projects[key].stack[s])
            }
    
            for(var i in this.props.projects[key].imgs) {
                imgs.push(this.props.projects[key].imgs[i])
            }
    
            projects.push (
                <Link style={{textDecoration: 'none'}} to={`/work/${this.props.projects[key].title.replace(' ','')}`}>
                    <ProjectContainer
                        key={this.props.projects[key].title}
                        title={this.props.projects[key].title} 
                        description={this.props.projects[key].description} 
                        stack={stack}
                        date={this.props.projects[key].date}
                        index={0+''+index}
                        imgs={imgs}
                        primary={this.props.secondary}
                        secondary={this.props.primary} />
                
                </Link>
            );
            index++;
        }

        return (
            <div style={containerStyle} className={style.ProjectsContainer}>
                <div className={style.Wrapper}>
                    { projects }
                    <p className={style.Footer}>
                        I'm constantly experimenting outside <br></br>
                        of client work to uncover unique layouts, styles, <br></br>
                        and interactions, and of late have been taking a lot of <br></br>
                        inspiration from print design in particular.
                    </p>
                </div>
            </div>
        );
    };

}

const mapStateToProps = (state) => {
    return {
        defaultColors: { ...state.reducer.defaultColors },
        colors: { ...state.reducer.altColors },
        projects: state.reducer.projects,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);