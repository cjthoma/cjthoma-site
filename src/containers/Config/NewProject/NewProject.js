import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storage } from '../../../store/firebase'
import axios from 'axios';

import style from './NewProject.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions/index';


class NewProJect extends Component {
    state = {
        title: null,
        stack: [],
        description: null,
        imgs: [],
        errorMessage: ''
    }

    inputOnChangeHandler = (event) => {
        let inputType = event.parentNode.firstChild.textContent;
        let stackValue = []
        if (inputType.includes('STACK')) {
            let reg = new RegExp(/, /); // was /\, /
            inputType = 'STACK';
            stackValue = event.value.split(reg);
        }

        switch(inputType) {
            case 'TITLE': {
                this.setState({
                    title: event.value
                });
                break;
            }

            case 'STACK': {
                this.setState({
                    stack: stackValue
                });
                break;
            }

            case 'DESCRIPTION': {
                this.setState({
                    description: event.value
                });
                break;
            }

            default:
                break;
        }
    }

    sendProjectHandler = () => {
        // checks if new project's inputs are valid before sending
        if(!(this.state.title) ||  !(this.state.description) || this.state.stack === 0 || this.state.imgs.length === 0){
            let e = null;
            if(this.state.imgs.length === 0) e = 'atleast 1 image';
            if(this.state.stack === 0)       e = 'a technology stack';
            if(!(this.state.description))   e = 'a description';
            if(!(this.state.title))         e = 'a title';
            this.setState({
                errorMessage: "Warning! Project MUST include " +e
            })

        } else {
            this.setState({
                errorMessage: null
            })

            axios.get('https://cjthoma-aedf4.firebaseio.com/projects.json')
            .then(response => {
                console.log(response.data)
                let oldProjects = response.data
                let ProjectID = this.state.title
                let newProject = {}


                newProject[ProjectID] = {
                    title: this.state.title,
                    description: this.state.description,
                    stack: [...this.state.stack],
                    imgs: [...this.state.imgs]
                }

                alert('Project Added! \n' 
                +'[' +this.state.title +']')
                this.props.addNewProject({...oldProjects , ...newProject}, this.props.token);
                console.log(test);

            })
            .catch(error => {
                console.log(error);
            });

        }
    }



    render () {

        let imgs = [];

        for(let i = 0; i < this.state.imgs.length; i++) {
            imgs.push(
                <div key={this.state.imgs[i]} className={style.ImgContainer} style={{backgroundColor: this.props.colors.textColor}}>
                    <img src={this.state.imgs[i]} alt={'project-img-'+i}></img>
                </div>
            )
        }

        return (
            <div className={style.OuterWrapper}>
                <div className={style.InnerWrapper}>
                    <div className={style.NewProJect}>
                    <div className={style.BoxHighlight} style={{backgroundColor: this.props.colors.textColor}}></div>
                        <div className={style.InputContainer}>
                            <h1 style={{color: this.props.colors.textColor}}>TITLE</h1>
                            <input onChange={(event) => this.inputOnChangeHandler(event.target)} type={'text'} style={{backgroundColor: this.props.colors.textColor}}></input>
                        </div>
                    </div>

                    <div className={style.NewProJect}>
                    <div className={style.BoxHighlight} style={{backgroundColor: this.props.colors.textColor}}></div>
                        <div className={style.InputContainer}>
                            <h1 style={{color: this.props.colors.textColor}}>STACK - (seperate each item by a comma)</h1>
                            <input onChange={(event) => this.inputOnChangeHandler(event.target)} type={'text'} style={{backgroundColor: this.props.colors.textColor}}></input>
                        </div>
                    </div>

                    <div className={style.NewProJect}>
                    <div className={style.BoxHighlight} style={{backgroundColor: this.props.colors.textColor}}></div>
                        <div className={style.InputContainer}>
                            <h1 style={{color: this.props.colors.textColor}}>ATTACH IMAGES</h1>
                            <input accept={"image/png, image/jpeg, image/gif, image/pdf"} type={'file'} id="upload" style={{backgroundColor: this.props.colors.textColor, display: 'none'}} 
                            onChange={((event) => {
                                let file = event.target.files[0];

                                const uploadTask = storage.ref(`project_imgs/${file.name}?auth=` +this.props.token).put(file);
                                uploadTask.on('state_changed', 
                                (snapshot) => {
                                    // progress function
                                }, 
                                (error)=> {
                                    // error function
                                    console.log(error);
                                    alert('Something went wrong during retrieval... Please try again.');
                                }, 
                                (complete)=> {
                                    // complete function
                                    storage.ref('project_imgs').child(file.name).getDownloadURL().then(url => {
                                        console.log(url);
                                        this.setState({
                                            imgs: [...this.state.imgs, url]
                                        })
                                    })
                                })
                                alert('Image Added to Prject! \n' 
                                +'[' +file.name +']')
                            })}></input>
                            <label className={style.Label}  style={{backgroundColor: this.props.colors.textColor}} for="upload">Upload File...</label>
                        </div>
                    </div>


                    <div className={style.NewProJect}>
                    <div className={style.BoxHighlight} style={{backgroundColor: this.props.colors.textColor}}></div>
                        <div className={style.InputContainer}>
                            <h1 style={{color: 'red'}}>{ this.state.errorMessage }</h1>
                            <label className={style.Label}  style={{backgroundColor: this.props.colors.textColor}} for="sendProject">Send Project...</label>
                            <button id="sendProject" style={{backgroundColor: this.props.colors.textColor, display: 'none'}} 
                            onClick={() => this.sendProjectHandler()}></button>
                        </div>
                    </div>


                </div> {/**INNER WRAPPER ( - TITLE - STACK - ATTACH ITEMS - ) */}
                <div className={style.NewProJect} style={{position: 'relative', width: '500px', height: '330px', margin: '0', top: '25px', left: '20px'}}>
                    <div className={style.BoxHighlight} style={{backgroundColor: this.props.colors.textColor}}></div>
                        <div className={style.InputContainer}>
                            <h1 style={{color: this.props.colors.textColor}}>DESCRIPTION</h1>
                            <textarea onChange={(event) => this.inputOnChangeHandler(event.target)} type={'text'} style={{backgroundColor: this.props.colors.textColor}}></textarea>
                        </div>
                    </div>
                <div className={style.ImgsContainer}>
                    { imgs }
                </div>

                </div> /**OUTTER WRAPPER ( - DESCRIPTION - IMAGE ITEMS - ) */
        )
    }
}

const mapStateTothisProps = (state) => {
    return {
        colors: state.reducer.colors,
        altColors: { ...state.reducer.altColors },
        token: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // configColor: (hexValue, colorType, previousColors) => dispatch(actions.configColor(hexValue, colorType, previousColors)),
        //navMouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        // setHover: (hoverSelection) => dispatch(actions.setHover(hoverSelection)),
        // fetchInitState: () => dispatch(actions.fetchInitState()),
        addImageToDB: (file, token) => dispatch(actions.addImageToDB(file, token)),
        addNewProject: (project, token) => dispatch(actions.addNewProject(project, token))
    }
}

export default connect(mapStateTothisProps, mapDispatchToProps)(NewProJect);

