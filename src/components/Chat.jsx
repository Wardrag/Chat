import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
function Chat({ db }) {
  const auth = getAuth();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  async function addMessage() {
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        email: auth.currentUser.email,
        text: inputValue,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const subMessages = [];
      querySnapshot.forEach((doc) => {
        subMessages.push(doc.data());
      });
      setMessages(subMessages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="Chat-main">
        {messages.length > 0
          ? messages.map((message, i) => {
              return (
                <div
                  className={`${
                    auth.currentUser.email === message.email
                      ? "Text-resiver"
                      : "Text-sendler"
                  } chat-main-text`}
                  key={i}
                >
                  <div className="Profile">
                    <p className="Name"></p>
                    <p className="Email">{message.email}</p>
                  </div>
                  <div className="Message-text">
                    <p className="Text">{message.text}</p>
                  </div>
                </div>
              );
            })
          : "now you dont have messages"}
      </div>
      <div className="Chat-bottom">
        <input
          type="text"
          className=""
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button className="" onClick={() => addMessage()}>
          send
        </button>
      </div>
    </div>
  );
}

export default Chat;
