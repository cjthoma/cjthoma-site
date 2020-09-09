import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchProjects = () => {
    return dispatch => {
        axios.get('https://cjthoma-aedf4.firebaseio.com/projects.json')
        .then(response => {
            dispatch(setProjects(response.data));
        })
        .catch(error => {
            console.log(error);
        });
    }
}

export const setProjects = (state) => {
    return {
        type: actionTypes.FETCH_PROJECTS,
        projects: state
    }
}  

export const addNewProject = (project, token) => {
    console.log(project);
    return dispatch => {
        axios.put('https://cjthoma-aedf4.firebaseio.com/projects.json?auth=' +token,
            { ...project })
        .then(response => {
            // console.log(response)
        }).catch(error => {
        })
    }
}