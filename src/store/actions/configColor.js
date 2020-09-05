import axios from 'axios';
import * as actionTypes from './actionTypes';

export const setHover = (hoverSelection) => {
        return dispatch => {
            setTimeout(() => {
                dispatch(hoverTest(hoverSelection));
            }, 2000)
        }
}

const hoverTest = (hoverSelection) => {
    return {
        type: actionTypes.SET_HOVER,
        hover: "WORK"
    }
}



export const configColor = (hexValue, colorType, previosColors) => {
    let updatedColors = null;

    switch(colorType) {
        case 'primary': {
            updatedColors = { ...previosColors, primary: hexValue }
            return dispatch => {
                axios.put('https://cjthoma-aedf4.firebaseio.com/colors/default.json',
                    { ...updatedColors })
                .then(response => {
                    // console.log(response)
                }).catch(error => {
                })
            }
        }

        case 'secondary': {
            updatedColors = { ...previosColors, secondary: hexValue }
            return dispatch => {
                axios.put('https://cjthoma-aedf4.firebaseio.com/colors/default.json',
                    { ...updatedColors })
                .then(response => {
                    // console.log(response)
                }).catch(error => {
                    console.log(error);
                })
            }
        }

        case 'altColor': {
            updatedColors = { ...previosColors, altColor: hexValue }
            return dispatch => {
                axios.put('https://cjthoma-aedf4.firebaseio.com/colors/default.json',
                    { ...updatedColors })
                .then(response => {
                    // console.log(response)
                }).catch(error => {
                    console.log(error);
                })
            }
        }

        case 'textColor': {
            updatedColors = { ...previosColors, textColor: hexValue }
            return dispatch => {
                axios.put('https://cjthoma-aedf4.firebaseio.com/colors/default.json',
                    { ...updatedColors })
                .then(response => {
                    // console.log(response)
                }).catch(error => {
                    console.log(error);
                })
            }
        }

        case 'textHighlight': {
            updatedColors = { ...previosColors, textHighlight: hexValue }
            return dispatch => {
                axios.put('https://cjthoma-aedf4.firebaseio.com/colors/default.json',
                    { ...updatedColors })
                .then(response => {
                    // console.log(response)
                }).catch(error => {
                    console.log(error);
                })
            }
        }

        case 'textDefocus': {
            updatedColors = { ...previosColors, textDefocus: hexValue }
            return dispatch => {
                axios.put('https://cjthoma-aedf4.firebaseio.com/colors/default.json',
                    { ...updatedColors })
                .then(response => {
                    // console.log(response)
                }).catch(error => {
                    console.log(error);
                })
            }
        }

        case 'alt-primary': {
            updatedColors = { ...previosColors, primary: hexValue }
            console.log(updatedColors);
            return dispatch => {
                axios.put('https://cjthoma-aedf4.firebaseio.com/colors/alt.json',
                    { ...updatedColors })
                .then(response => {
                    // console.log(response)
                }).catch(error => {
                    console.log(error);
                })
            }
        }

        case 'alt-secondary': {
            updatedColors = { ...previosColors, secondary: hexValue }
            console.log(updatedColors);
            return dispatch => {
                axios.put('https://cjthoma-aedf4.firebaseio.com/colors/alt.json',
                    { ...updatedColors })
                .then(response => {
                    // console.log(response)
                }).catch(error => {
                    console.log(error);
                })
            }
        }

        case 'alt-altColor': {
            updatedColors = { ...previosColors, altColor: hexValue }
            console.log(updatedColors);
            return dispatch => {
                axios.put('https://cjthoma-aedf4.firebaseio.com/colors/alt.json',
                    { ...updatedColors })
                .then(response => {
                    // console.log(response)
                }).catch(error => {
                    console.log(error);
                })
            }
        }

        default: {
            return;
        }

    }
}

// export const setProjects = (state) => {
//     return {
//         type: actionTypes.FETCH_PROJECTS,
//         projects: state
//     }
// }