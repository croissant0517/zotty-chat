import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";

export function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.test}>Hello world!</h1>
      <div className={styles.chatWrapper}>
        <div className={styles.chatBox}>
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
        <div className={styles.textBox}>
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button
            onClick={() => {
              setMessages([...messages, text]);
              setText("");
            }}
          >
            送出
          </button>
        </div>
      </div>
    </div>
  );
}
