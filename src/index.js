import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ui/styles/main.css";
import {store} from "./redux/store";
import {Provider} from "react-redux";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Groq from "groq-sdk";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_APP_DOMAIN+".firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_APP_DOMAIN,
    storageBucket: process.env.REACT_APP_FIREBASE_APP_DOMAIN+".appspot.com",
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize groq API
export const groq = new Groq({apiKey: process.env.REACT_APP_GROQ_API_KEY, dangerouslyAllowBrowser: true});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
