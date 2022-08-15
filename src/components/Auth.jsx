import { useState } from "react";
import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
function Auth() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function onRegisterHandler(event) {
    event.preventDefault();

    try {
      const auth = getAuth();
      const res = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  }
  async function onLoginHandler(event) {
    event.preventDefault();

    try {
      const auth = getAuth();
      const res = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <form>
      <div className="login-container">
      <input
        type="text"
        className=""
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="email"
        className=""
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        className=""
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={(event) => onLoginHandler(event)}> login </button>
      <button onClick={(event) => onRegisterHandler(event)}>
        {" "}
        registration{" "}
      </button>
      {error ? <p> {error}</p> : null}
      </div>
      
    </form>
  );
}
export default Auth;
