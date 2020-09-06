import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storage } from '../../../store/firebase'
import axios from 'axios';

import style from './NewProject.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';
import * as actions from '../../../store/actions/index';


class NewProJect extends Component {
    state = {
        newProject: {
            title: null,
            stack: null,
            description: null,
            imgs: null
        },
        imgs: []
    }

    inputOnChangeHandler = (event) => {
        let updatedState = { ...this.state.newProject }
        updatedState[event.target.parentNode.innerText.toLowerCase()] = event.target.value;
        this.setState({
            newProject: { ...updatedState },
            imgs:  {...this.state.imgs}
        })
    }



    render () {
        return (
            <div className={style.OuterWrapper}>
                <div className={style.InnerWrapper}>
                    <div className={style.NewProJect}>
                    <div className={style.BoxHighlight} style={{backgroundColor: this.props.colors.textColor}}></div>
                        <div className={style.InputContainer}>
                            <h1 style={{color: this.props.colors.textColor}}>TITLE</h1>
                            <input type={'text'} style={{backgroundColor: this.props.colors.textColor}}></input>
                        </div>
                    </div>

                    <div className={style.NewProJect}>
                    <div className={style.BoxHighlight} style={{backgroundColor: this.props.colors.textColor}}></div>
                        <div className={style.InputContainer}>
                            <h1 style={{color: this.props.colors.textColor}}>STACK - (seperate each item by a comma)</h1>
                            <input type={'text'} style={{backgroundColor: this.props.colors.textColor}}></input>
                        </div>
                    </div>

                    <div className={style.NewProJect}>
                    <div className={style.BoxHighlight} style={{backgroundColor: this.props.colors.textColor}}></div>
                        <div className={style.InputContainer}>
                            <h1 style={{color: this.props.colors.textColor}}>ATTACH IMAGES</h1>
                            <input onChange={((event) => {


                                this.props.addImageToDB(event.target.files[0])
                                let test = event.target.files[0].name
                                setTimeout(() => {
                                    storage.ref('project_imgs').child(test).getDownloadURL().then(url => {
                                        this.setState({
                                            imgs: [...this.state.imgs, url]
                                        })
                                    })

                                }, 2000)

                            })}  accept={"image/png, image/jpeg"} type={'file'} id="upload" style={{backgroundColor: this.props.colors.textColor, display: 'none'}}></input>
                            <label className={style.Label}  style={{backgroundColor: this.props.colors.textColor}} for="upload">Upload File...</label>
                        </div>
                    </div>
                </div> {/**INNER WRAPPER ( - TITLE - STACK - ATTACH ITEMS - ) */}
                <div className={style.NewProJect} style={{position: 'relative', width: '500px', height: '330px', margin: '0', top: '25px'}}>
                    <div className={style.BoxHighlight} style={{backgroundColor: this.props.colors.textColor}}></div>
                        <div className={style.InputContainer}>
                            <h1 style={{color: this.props.colors.textColor}}>DESCRIPTION</h1>
                            <input type={'text'} style={{backgroundColor: this.props.colors.textColor, width: '93%', height: '280px'}}></input>
                        </div>
                    </div>

                    <div className={style.ImgContainer} style={{backgroundColor: this.props.colors.textColor}}>
                        <h1 >img</h1>
                    </div>

                </div> /**OUTTER WRAPPER ( - DESCRIPTION - IMAGE ITEMS - ) */
        )
    }
}

const mapStateTothisProps = (state) => {
    return {
        colors: state.colors,
        altColors: { ...state.altColors }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        configColor: (hexValue, colorType, previousColors) => dispatch(actions.configColor(hexValue, colorType, previousColors)),
        navMouseOver: (event, maskSize) => dispatch({type: actionTypes.NAV_MOUSEOVER_HANDLER, payload: { event: event, maskSize: maskSize }}),
        setHover: (hoverSelection) => dispatch(actions.setHover(hoverSelection)),
        fetchInitState: () => dispatch(actions.fetchInitState()),
        addImageToDB: (file) => dispatch(actions.addImageToDB(file)),
    }
}

export default connect(mapStateTothisProps, mapDispatchToProps)(NewProJect);

