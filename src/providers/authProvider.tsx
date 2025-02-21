"use client"
import React from "react";
import { useSession } from "next-auth/react";

import { fetchServer } from "@/lib/net/fetch/fetch";
import { useUserStore } from "@/store";
import SignInModal from "@/components/modal/SignIn";
import SignUpModal from "@/components/modal/SignUp";


type AuthForm = 'SIGN_IN' | 'SIGN_UP';

type AuthSession = {
  _id: string;
  name?: string;
  email: string;
  image?: string;
}

type AuthContextType = {
  visibleAuthForm: AuthForm | null;
  sessionData: AuthSession | undefined;
  setVisibleAuthForm: React.Dispatch<React.SetStateAction<AuthForm | null>>;
  setSessionData: React.Dispatch<React.SetStateAction<AuthSession | undefined>>;
}

export const AuthContext = React.createContext<AuthContextType>({
  visibleAuthForm: null,
  sessionData: undefined,
  setVisibleAuthForm: () => {},
  setSessionData: () => {},
});

interface IProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<IProps> = ({children}) => {
  const { data: session } = useSession();
  const { setUserData } = useUserStore();

  const [sessionData, setSessionData] = React.useState<AuthSession | undefined>(undefined);
  const [visibleAuthForm, setVisibleAuthForm] = React.useState<AuthForm | null>(null);

  // React.useEffect(() => {
  //   setSessionData(session?.user);
  // }, [session]);

  React.useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetchServer("/api/user");
      if (res) {
        setUserData(res);
      }
    }
    
    if (sessionData && sessionData._id !== 'admin') {
      fetchUserData();
    }
  }, [])


  return (
    <AuthContext.Provider value={{ visibleAuthForm, setVisibleAuthForm, sessionData, setSessionData }}>
      {visibleAuthForm === "SIGN_IN" && <SignInModal />}
      {visibleAuthForm === "SIGN_UP" && <SignUpModal />}
      {children}
    </AuthContext.Provider>
  )
} 

export default AuthProvider;