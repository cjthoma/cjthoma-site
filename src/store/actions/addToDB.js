import { storage } from '../firebase';

export const addImageToDB = (file) => {
    return dispatch => {
        const uploadTask = storage.ref(`project_imgs/${file.name}`).put(file);
        uploadTask.on('state_changed', 
        (snapshot) => {
            // progress function
        }, 
        (error)=> {
            // error function
            console.log(error);
        }, 
        (complete)=> {
            // complete function
        })
    }
}