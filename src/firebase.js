import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0ueb2EtRcmhX2MMEqs-7i2c3PsBkAqVY",
  authDomain: "shop-f9823.firebaseapp.com",
  projectId: "shop-f9823",
  storageBucket: "shop-f9823.appspot.com",
  messagingSenderId: "730655330880",
  appId: "1:730655330880:web:ce6a08f1b705144d3b85a5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
