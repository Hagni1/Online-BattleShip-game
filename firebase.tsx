import { initializeApp, getApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAwfPY1dBuDw3A8w8j-fK48FwXDnCjtbaA",
    authDomain: "ships-game-f181d.firebaseapp.com",
    databaseURL: "https://ships-game-f181d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ships-game-f181d",
    storageBucket: "ships-game-f181d.appspot.com",
    messagingSenderId: "820812993547",
    appId: "1:820812993547:web:0396d854b2fdec9f9f630e",
    measurementId: "G-M6L16NMCJV"
  };

const app = initializeApp(firebaseConfig);

export { app };