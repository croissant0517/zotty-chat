import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";

export function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log({ messages });
  }, [messages]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.test}>Hello world!</h1>
      <div className={styles.chatWrapper}>
        <div className={styles.chatBox}>
          {messages.length > 0 &&
            messages.map((item, index) => {
              <div key={"message-" + index}>{item}</div>;
            })}
        </div>
        <div className={styles.textBox}>
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button
            onClick={() => {
              console.log({ text, messages });
              const newMsg = messages.push(text);
              setMessages(newMsg);
            }}
          >
            送出
          </button>
        </div>
      </div>
    </div>
  );
}
