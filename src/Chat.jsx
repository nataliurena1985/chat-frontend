import { useEffect, useState } from "react";

import { CardContent, Card, Icon } from "semantic-ui-react";
import { FormField, Button, Container, Form } from "semantic-ui-react";
import { Input } from "semantic-ui-react";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");

  const [messagesList, setMessagesList] = useState([]);

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
      await socket.emit("send_message", info);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessagesList((list) => {
        [...list, data];
      });
    });
  }, [socket]);

  return (
    <Container>
      <Card fluid>
        <CardContent header={` Chat en vivo |  sala : ${room} `} />
        <CardContent style={{ minHeight: "300px" }}>
          Mensajes
          {messagesList.map((item) => {
            return <h3>{item.message}</h3>;
          })}
        </CardContent>
        <CardContent extra>
          <Form>
            <FormField>
              <Input
                action={{
                  color: "teal",
                  labelPosition: "right",
                  icon: "send",
                  content: "Enviar",

                  onClick: sendMessage,
                }}
                type="text"
                placeholder="Message..."
                onChange={(e) => setCurrentMessage(e.target.value)}
              ></Input>
            </FormField>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Chat;
