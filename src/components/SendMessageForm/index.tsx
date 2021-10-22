import { FormEvent, useContext, useRef } from "react";
import { VscSignOut, VscGithubInverted } from "react-icons/vsc";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import {
  SendMessageFormWrapper,
  SignOutButton,
  UserInformation,
  UserImage,
  UserName,
  UserGithub,
  SendMessageFormContainer,
} from "./styles";

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  async function handleSendMessage(event: FormEvent) {
   try {
    event.preventDefault();
    if (!messageRef.current?.value.trim()) return;

    const message = messageRef.current.value;

    await api.post('messages', { message });

    messageRef.current.value = "";
   } catch (error) {
     console.log(error);
   }
  }

  return (
    <SendMessageFormWrapper >
      <SignOutButton onClick={signOut}>
        <VscSignOut size={32} />
      </SignOutButton>

      <UserInformation>
        <UserImage>
          <img src={user?.avatar_url} alt={user?.name} />
        </UserImage>
        <UserName>{user?.name}</UserName>
        <UserGithub>
          <VscGithubInverted size={16} />
          {user?.login}
        </UserGithub>
      </UserInformation>
      <SendMessageFormContainer onSubmit={handleSendMessage}>
        <label htmlFor="message">Mensagem</label>
        <textarea ref={messageRef} name="message" id="message" placeholder="Qual sua expectativa pro evento?" />
        <button type="submit">Enviar mensagem</button>
      </SendMessageFormContainer>
    </SendMessageFormWrapper>
  );
}

function UserContext(UserContext: any): { user: any } {
  throw new Error("Function not implemented.");
}
