import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq0OcJSATJxfdDhwH5LS69UNazqXhH9UA",
  authDomain: "kievska-chat.firebaseapp.com",
  projectId: "kievska-chat",
  storageBucket: "kievska-chat.appspot.com",
  messagingSenderId: "189422211927",
  appId: "1:189422211927:web:e30f2433ca97c042ffa412",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App db={db}/>
  </React.StrictMode>
);
