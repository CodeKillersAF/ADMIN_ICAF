import firebase from 'firebase';

const config ={
    apiKey: "AIzaSyDd8WxJvsuWnyietPoUFF_ESYEkvzfxxtQ",
    authDomain: "icaf-app-aa49c.firebaseapp.com",
    projectId: "icaf-app-aa49c",
    storageBucket: "icaf-app-aa49c.appspot.com",
    messagingSenderId: "432067038287",
    appId: "1:432067038287:web:27f4fedac15d3db0c56e3a",
    measurementId: "G-66LC9LL4VQ"
}

firebase.initializeApp(config);
firebase.analytics();

const storage = firebase.storage();

export {
    storage , firebase as default
}