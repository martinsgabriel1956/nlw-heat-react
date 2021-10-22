import { useContext } from "react";

import { ContentWrapper } from "./styles/pages/Home";

import { MessageList } from "./components/MessageList";
import { LoginBox } from "./components/LoginBox";
import { SendMessageForm } from "./components/SendMessageForm";

import { AuthContext } from "./contexts/AuthContext";

export function App() {
  const { user } = useContext(AuthContext);

  return (
    <ContentWrapper>
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </ContentWrapper>
  );
}
