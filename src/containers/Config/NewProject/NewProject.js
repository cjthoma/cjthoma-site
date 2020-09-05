import React, { Component } from 'react';
import axios from 'axios';


import style from './NewProject.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';

class Config extends Component {
    state = {
        newProject: {
            title: null,
            stack: null,
            description: null,
            imgs: null
        },
        imgs: ['test']
    }

    inputOnChangeHandler = (event) => {
        let updatedState = { ...this.state.newProject }
        updatedState[event.target.parentNode.innerText.toLowerCase()] = event.target.value;
        this.setState({
            newProject: { ...updatedState },
            imgs:  {...this.state.imgs}
        })
    }

    imgInputChangeHandler = (event) => {
        
        let updatedState = [...this.state.imgs];
        console.log(updatedState);
        updatedState.push(event.target.files[0]);
        console.log(updatedState);

        this.setState({
            newProject:  this.state.newProject,
            imgs:  [updatedState]
        })
    }
    

    render () {
        return (
            <div className={style.NewProject}>
            <div className={style.Container}>
                <h1>ADD NEW PROJECT TO WORK PAGE</h1>
                <div className={style.Title}>
                    <div>
                        <h6>TITLE</h6>
                        <input 
                            type="text" 
                            onChange={(event) => this.inputOnChangeHandler(event)} 
                            ></input>
                    </div>
    
                    <div>   
                        <h6>STACK</h6>
                        <input 
                            type="text" 
                            onChange={(event) => this.inputOnChangeHandler(event)}
                            ></input>
                    </div>
                </div>
    
                <div className={style.Description}>
                    <h6>DESCRIPTION</h6>
                    <input 
                        type="text" 
                        onChange={(event) => this.inputOnChangeHandler(event)}
                        style={{width: '60vw', height: '200px'}}></input>
                </div>
                
                <div className={style.AddImages}>
                    <h6>ADD IMAGES...</h6>
                    <input 
                        type="file" 
                        onChange={(event) => this.imgInputChangeHandler(event)}
                        style={{width: '500px'}}></input>
                </div>
                <button onClick>ADD PROJECT</button>
            </div>
        </div>
        )
    }
}

export default Config;

