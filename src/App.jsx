import React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";

import Chat from "./Chat"

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
         socket.emit("join_room",room);

    }
  };

  return (
    <>
      App
      <div className="chat">
        <h3>unirme al chat</h3>
        <input
          type="text"
          placeholder="claudia ..."
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <input
          type="text"
          placeholder="Id sala:"
          onChange={(e) => setRoom(e.target.value)}
        ></input>
        <button onClick={joinRoom}>unirme</button>

        <Chat socket={socket} username={username} room={room} />
      </div>
    </>
  );
};

export default App;
