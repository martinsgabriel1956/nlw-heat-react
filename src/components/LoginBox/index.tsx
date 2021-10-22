import { useContext } from 'react';
import { VscGithubInverted } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/AuthContext';

import { LoginBoxWrapper, SignInWithGithub } from './styles';

export function LoginBox() {
  const { signInUrl } = useContext(AuthContext);

  return (
    <LoginBoxWrapper>
      <strong>Entre e compartilhe sua mensagem</strong>
      <SignInWithGithub href={signInUrl}>
        <VscGithubInverted size={24} />
        Entrar com o Github
      </SignInWithGithub>
    </LoginBoxWrapper>
  );
};