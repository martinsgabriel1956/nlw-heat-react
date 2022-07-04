import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";


type User = {
  id: string;
  name: string;
  avatar_url: string;
  login: string;
};

interface AuthContextData {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    avatar_url: string;
    login: string;
  }
}

const setAuthorizationToken = (token: string) => {
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
  }
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`;

  async function signIn(githubCode: string) {
    const res = await api.post<AuthResponse>("authenticate", {
      code: githubCode,
    });

    const { token, user } = res.data;

    localStorage.setItem("@dowhile:token", token);

    setAuthorizationToken(token);

    setUser(user);
  }

  async function signOut() {
    localStorage.removeItem("@dowhile:token");
    setUser(null);
  }

  useEffect(() => {
    const token = localStorage.getItem("@dowhile:token");

    if (token) {
      setAuthorizationToken(token);

      (async function fetchData() {
        const res = await api.get<User>('profile');
        const data= await res.data;

        setUser(data);
      })();
    }
    
  }, []);

  useEffect(() => {
    const url = location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");

      history.pushState({}, "", urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return <AuthContext.Provider value={{
    user,
    signInUrl,
    signOut
  }}>{children}</AuthContext.Provider>;
}
