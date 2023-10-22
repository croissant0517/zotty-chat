import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import { io } from "socket.io-client";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import styles from "./App.module.scss";

// import Message from "./components/message";

const URL: string =
  // process.env.NODE_ENV === "production" ? "" : "http://192.168.0.121:8000/";
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8000/";
export const socket = io(URL, {
  autoConnect: false,
});

export function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Array<string>>([]);
  const [open, setOpen] = useState(true);
  const messageRef = useRef<HTMLDivElement>(null);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    socket.connect();

    socket.on("chat message", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });
  }, []);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages]);

  const disconnect = () => {
    socket.disconnect();
  };

  const connect = () => {
    socket.connect();
  };

  const handleDialog = () => setOpen((prev) => !prev);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.test}>Hello world!</h1>
      <div className={styles.chatWrapper}>
        <div className={styles.chatBox}>
          <div ref={messageRef}>
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
            onKeyUp={(e) => {
              if (e.key === "Enter" && text) {
                // Do Something, may be an 'Undo' operation
                socket.emit("chat message", text);
                setText("");
              }
            }}
            onCompositionEnd={(e: any) => {
              if (e.key === "Enter") return;
            }}
          />
          <Button
            onClick={() => {
              if (text) {
                socket.emit("chat message", text);
                setText("");
              }
            }}
          >
            送出
          </Button>
          <Button
            onClick={() => {
              disconnect();
            }}
          >
            離開聊天室
          </Button>
          <Dialog
            onClose={(event, reason) => {
              if (reason !== "backdropClick") handleDialog();
            }}
            open={open}
          >
            <DialogContent>
              請輸入名稱:
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Button
                onClick={() => {
                  if (userName) {
                    socket.emit("setname", userName);
                    handleDialog();
                    connect();
                  }
                }}
              >
                進入聊天室
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
