"use client";

import { AuthContext } from "@/providers/authProvider";
import React from "react";

const SignInModal: React.FC = () => {

  const { setVisibleAuthForm, sessionData } = React.useContext(AuthContext);

  const formRef = React.useRef<HTMLDivElement>(null);

  const handleFormOutSlideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (formRef.current && !formRef.current.contains(e.target as HTMLElement)) {
      setVisibleAuthForm(null);
    }
  }
  return (
    <div
      className=" fixed z-50 w-screen min-h-screen flex justify-center items-center backdrop-blur-md p-2 sm:p-4 lg:p-8 text-white"
      onClick={handleFormOutSlideClick}
    >
      <div className=" w-full max-w-[494px] rounded-large bg-[#121212] p-6 text-white shadow-large" ref={formRef}>
        <h1>Sign in</h1>
      </div>
    </div>
  );
};

export default SignInModal;
