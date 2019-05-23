import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/css/font-awesome.min.css';
import './assets/css/elegent-icons.css';
import './assets/css/bootstrap.min.css';
import './assets/css/owl.carousel.css';
import './assets/css/themes.css';
import './assets/css/responsive.css';
import './assets/css/style.css';
import './assets/css/header.css';
import './assets/css/themes.css';
import firebaseConfigData from './config';
import Page from './Page';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: firebaseConfigData.apiKey,
    authDomain: firebaseConfigData.authDomain,
    databaseURL: firebaseConfigData.databaseURL,
    projectId: firebaseConfigData.projectId,
    storageBucket: firebaseConfigData.storageBucket,
    messagingSenderId: firebaseConfigData.messagingSenderId,
    appId: firebaseConfigData.appId
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<Page />, document.getElementById('root'));

serviceWorker.unregister();
