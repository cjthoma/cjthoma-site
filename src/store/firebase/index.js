import firebase from 'firebase';

let firebaseConfig = {
    apiKey: ' AIzaSyC2sko3pCGWr8LarbmBaiFbyXalZ064lSg',
    authDomain: '<your-auth-domain>',
    databaseURL: 'gs://cjthoma-aedf4.appspot.com/',
    storageBucket: 'gs://cjthoma-aedf4.appspot.com/'
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

let storage = firebase.storage();

export { storage, firebase as  default };