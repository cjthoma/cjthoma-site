import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import axios from 'axios';

import Project from './Project/Project';
import style from './Work.module.css';
import * as actionTypes from '../../../store/actions/actionTypes';

import kunjaniImg1 from '../../../assets/images/kunjani_imgs/Beer&Food.jpg';
import kunjaniImg2 from '../../../assets/images/kunjani_imgs/Wine.jpg';
import kunjaniImg3 from '../../../assets/images/kunjani_imgs/HappyHour.jpg';

import mixxerImg1 from '../../../assets/images/mixxer_imgs/1.png';
import mixxerImg2 from '../../../assets/images/mixxer_imgs/2.png';
import mixxerImg3 from '../../../assets/images/mixxer_imgs/3.png';
import mixxerImg4 from '../../../assets/images/mixxer_imgs/4.png';

import portfolio1 from '../../../assets/images/portfolio_site/1.png';
import portfolio2 from '../../../assets/images/portfolio_site/2.png';
import portfolio3 from '../../../assets/images/portfolio_site/3.png';

const Work = (props) => {
    let kunjaniImgs = [kunjaniImg1, kunjaniImg2, kunjaniImg3];
    let mixxerImgs = [mixxerImg1, mixxerImg2, mixxerImg3, mixxerImg4];
    let portfolioImgs = [portfolio1, portfolio2, portfolio3];

    

  // Set the configuration for your app
  // TODO: Replace with your app's config object

    var firebaseConfig = {
        apiKey: '<your-api-key>',
        authDomain: '<your-auth-domain>',
        databaseURL: 'https://cjthoma-aedf4.firebaseio.com/',
        storageBucket: 'gs://cjthoma-aedf4.appspot.com/'
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    var storage = firebase.storage();

    var imgRef = storage.ref('/project_imgs/');
    console.log(imgRef)

    imgRef.getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'
        console.log(url)
        // // This can be downloaded directly:
        // var xhr = new XMLHttpRequest();
        // xhr.responseType = 'blob';
        // xhr.onload = function(event) {
        //     var blob = xhr.response;
        // };
        // xhr.open('GET', url);
        // xhr.send();

        // // Or inserted into an <img> element:
        // var img = document.getElementById('myimg');
        // img.src = url;
        }).catch(function(error) {
        // Handle any errors
        });
        
    
    // console.log(imagesRef);



    let projects = [];

    for(let key in props.projects) {
        let stack = [];
        for(let s in props.projects[key].stack) {
            stack.push(s);
        }

        projects.push (
            <Project 
            title={props.projects[key].title} 
            description={props.projects[key].description} 
            stack={stack}
            date={props.projects[key].date}
            index={1}
            imgs={portfolioImgs}
            primary={props.secondary}
            secondary={props.primary} />
        );
    }


    return (
        <div className={style.Work}>
            { projects }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        projects: state.projects
    }
}

export default connect(mapStateToProps)(Work);