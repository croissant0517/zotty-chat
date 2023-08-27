import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import styles from "./App.module.scss";
import { io } from "socket.io-client";
// import Message from "./components/message";

const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : // : "http://192.168.0.121:8000/";
      "http://localhost:8000/";
export const socket = io(URL, {
  autoConnect: false,
});

export function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();

    socket.on("chat message", (msg) => {
      // console.log("message: " + msg);
      setMessages((messages) => [...messages, msg]);
    });
  }, []);

  const disconnect = () => {
    socket.disconnect();
  };

  const connect = () => {
    socket.connect();
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.test}>Hello world!</h1>
      <div className={styles.chatWrapper}>
        <div className={styles.chatBox}>
          <div>
            {messages.map((item, index) => {
              return (
                <div
                  key={"message-" + index}
                  className={`${styles.message} ${
                    index % 2 === 0 ? styles.right : ""
                  }`}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.textBox}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && text) {
                // Do Something, may be an 'Undo' operation
                socket.emit("chat message", text);
                setText("");
              }
            }}
          />
          <button
            onClick={() => {
              if (text) {
                socket.emit("chat message", text);
                setText("");
              }
            }}
          >
            送出
          </button>
          <button onClick={() => disconnect()}>離開聊天室</button>
          <button onClick={() => connect()}>進入聊天室</button>
        </div>
      </div>
    </div>
  );
}
