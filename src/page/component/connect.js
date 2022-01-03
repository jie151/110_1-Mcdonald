import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyAqsgKm648AxM8zsk6JwWkPnDoqg4vfu-E",
    authDomain: "mcdonalds-order-system.firebaseapp.com",
    projectId: "mcdonalds-order-system",
    storageBucket: "mcdonalds-order-system.appspot.com",
    messagingSenderId: "829019964920",
    appId: "1:829019964920:web:9448bf7f82fc352dcd020d",
    measurementId: "G-413BS48B3Z"
};


// {const firebaseConfig = {
//     apiKey: "AIzaSyAqzRd3tRQew91RXhmMLjAPk2kCVM44F6g",
//     authDomain: "mcdonalds-order-system2.firebaseapp.com",
//     projectId: "mcdonalds-order-system2",
//     storageBucket: "mcdonalds-order-system2.appspot.com",
//     messagingSenderId: "181823145660",
//     appId: "1:181823145660:web:21699432f2632de2b3b2b9",
//     measurementId: "G-PMPXC6S9FM"
//   };}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;

/*
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAqsgKm648AxM8zsk6JwWkPnDoqg4vfu-E",
    authDomain: "mcdonalds-order-system.firebaseapp.com",
    projectId: "mcdonalds-order-system",
    storageBucket: "mcdonalds-order-system.appspot.com",
    messagingSenderId: "829019964920",
    appId: "1:829019964920:web:9448bf7f82fc352dcd020d",
    measurementId: "G-413BS48B3Z"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
*/
