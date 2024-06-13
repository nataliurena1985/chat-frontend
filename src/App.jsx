import React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { Container,Divider } from "semantic-ui-react";
import { CardContent, Card, Icon } from "semantic-ui-react";
import { FormField, Button, Form } from "semantic-ui-react";
import Chat from "./Chat"

const socket = io.connect("http://localhost:3001");

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);



  const joinRoom = () => {
    if (username !== "" && room !== "") {
         socket.emit("join_room",room);

           setShowChat(true);

    }
  };

  return (
    <Container>
      {!showChat ? (
        <Card fluid>
          <CardContent header="unirme al chat" />
          <CardContent>
            <Form>
              <FormField>
                <label>Username:</label>
                <input
                  type="text"
                  placeholder="claudia ..."
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </FormField>
              <FormField>
                <label>Sala:</label>
                <input
                  type="text"
                  placeholder="Id sala:"
                  onChange={(e) => setRoom(e.target.value)}
                ></input>
              </FormField>
              <button onClick={joinRoom}>unirme</button>
            </Form>
          </CardContent>
          <CardContent extra>
            <Icon name="user" />4 Friends
          </CardContent>
        </Card>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}

     
    </Container>
  );
};

export default App;
