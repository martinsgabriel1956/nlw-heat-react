import { useEffect, useState } from "react";
import io from "socket.io-client";

import { api } from "../../services/api";

import {
  MessageListWrapper,
  MessageListContent,
  Message,
  MessageContent,
  MessageUser,
  UserImage,
} from "./styles";

import logoImg from "../../assets/logo.svg";

interface Message {
  id: string;
  text: string;
  user: {
    avatar_url: string;
    name: string;
  };
}

let messagesQueue: Message[] = [];

const socket = io(import.meta.env.VITE_API_URL);

socket.on("new_message", (newMessage: Message) => {
  messagesQueue.push(newMessage);
})


export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );
        messagesQueue.shift();
      }
    }, 3000);
  });

  useEffect(() => {
    (async function fetchData() {
      const res = await api.get<Message[]>("messages/last3");
      const data = await res.data;

      setMessages(data);
    })();
  }, []);
  return (
    <MessageListWrapper>
      <img src={logoImg} alt="logo" />

      <MessageListContent>
        {messages?.map((message) => (
          <Message key={message.id}>
            <MessageContent>{message.text}</MessageContent>
            <MessageUser>
              <UserImage>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </UserImage>
              <span>{message.user.name}</span>
            </MessageUser>
          </Message>
        ))}
      </MessageListContent>
    </MessageListWrapper>
  );
}
