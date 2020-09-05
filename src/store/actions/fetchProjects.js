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