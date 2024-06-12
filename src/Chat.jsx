import React from "react";

import { useState, useEffect } from "react";

const chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (username && currentMessage) {
      const info = {
        message: currentMessage,
        room: room,
        author: username,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
        await socket.emit("send_message",info);
    }
  };

  return (
    <div>
      chat
      <section className="chat-header">
        <p>chat en vivo</p>
      </section>
      <section className="chat-messages"></section>
      <section className="chat-footer">
        <input
          type="text"
          placeholder="Message..."
          onChange={(e) => setCurrentMessage(e.target.value)}
        ></input>
        <button>Enviar 💬</button>
      </section>
    </div>
  );
};

export default chat;
