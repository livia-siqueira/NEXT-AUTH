import { createContext, useEffect, useState } from "react";
import { recoverUserInformation, signRequest } from "../services/auth";
import {parseCookies, setCookie} from 'nookies'
import Router from 'next/router'
import { api } from "../services/api";

type User = {
    email: string;
    name: string;
    avatar_url: string;
}

interface ISignData {
    email: string;
    password: string;
}

interface IAutheticated {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: ISignData) => Promise<void>
}





export const AuthContext = createContext({} as IAutheticated);

export const AuthProvider: React.FC = ({ children }) => {
 
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
      const {'nextauth.token': token} = parseCookies();
      if(token) {
          recoverUserInformation().then(resp => {
              setUser(resp.user);
          })
      }
  }, [])


  const isAuthenticated: boolean = !!user;

  async function signIn({ email, password }: ISignData) {
    const { token, user } = await signRequest({
      email,
      password,
    })

    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })


    setUser(user)

    Router.push('/dashboard');
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
