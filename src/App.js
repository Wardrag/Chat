import Chat from "./components/Chat";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Auth from "./components/Auth";
import { useEffect, useState } from "react";
function App(props) {
  const auth = getAuth();
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, [auth]);
  return (
    <div>
      <div className="log-out-container">
        <div className="logo"></div>
        <div className="log-out-button">
          <button onClick={() => signOut(auth)}>Log out</button>
        </div>
      </div>
      {isAuth ? <Chat db={props.db}></Chat> : <Auth></Auth>}
    </div>
  );

}

export default App;
