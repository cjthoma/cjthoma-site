import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as corsModule from 'cors';

const cors = corsModule({origin: true})

export const fetchInitState = () => {
    return dispatch => {
        axios.get('https://cjthoma-aedf4.firebaseio.com/colors.json')
        .then(response => {
            dispatch(setInitState(response.data));
        })
        .catch(error => {
            console.log(error);
        });
        
    }
}

export const setInitState = (state) => {
    return {
        type: actionTypes.SET_STATE,
        colors: state
    }
}