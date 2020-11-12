import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import style from './DesktopWorkPage.module.css';
import Aux from '../../../hoc/Aux';
import { connect } from 'react-redux';
import PageLink from '../../../components/UI/PageLink/PageLink';

class ProjectsContainer extends Component {
    render () {
        var containerStyle = null;
        // checks if layer should recieve mask layer or default layer styles
        if(this.props.mask) {
            containerStyle = { ...this.props.mask, backgroundColor: this.props.colors.primary };
        } else if(window.innerWidth > 425) {
            containerStyle = { backgroundColor: this.props.colors.altColor };
        } else {
            containerStyle = { backgroundColor: this.props.colors.altColor };
        }


        let pageLinks = [];
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
    
            pageLinks.push (
                <Link style={{textDecoration: 'none'}} to={`/work/${this.props.projects[key].title.replace(' ','')}`}>
                    <PageLink
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
            <div style={containerStyle} className={style.Wrapper}>
                <div className={style.ProjectsContainer}>
                <div className={style.PageLinksContainer}>
                { pageLinks }
                </div>
                    
                    <div className={style.Footer}>
                        <div className={style.Dash} style={{backgroundColor: this.props.colors.primary}}>.</div>
                        <p style={{color: this.props.defaultColors.primary}}>
                            I'm constantly experimenting outside of client <br></br>
                            work to uncover unique layouts, styles, and<br></br>
                            interactions, and of late have been taking a lot<br></br>
                            of inspiration from print design in particular.<br></br><br></br>

                            Reach out and connect with me!
                        </p>
                        <Link style={{textDecoration: 'none'}} to={`/contact`}>
                            <PageLink
                                key={'contact'}
                                title={'contact'} 
                                description={null} 
                                stack={null}
                                date={null}
                                index={'0'+(index+1)}
                                imgs={null}
                                primary={this.props.colors.secondary}
                                secondary={this.props.colors.primary} />
                        </Link>
                    </div>
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