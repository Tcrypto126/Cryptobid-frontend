"use client";
import React from "react";
import { Link, Modal, ModalContent } from "@nextui-org/react";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { Icon } from "@iconify/react";
import * as RPNInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";

import { AuthContext } from "@/providers/authProvider";
import useNotification from "@/hooks/useNotification";
import { useSettingStore } from "@/store";
import { useUserStore } from "@/store";
import { fetchServer, postServer, putServer } from "@/lib/net/fetch/fetch";
import { APIError } from "@/lib/net/fetch/APIError";
import { validateAndFormatDate } from "@/lib/utils";
// import { PhoneInput } from "../phone-nubmber-input"; 
import PrimaryButton from "../button";
import Input


const SignUpModal: React.FC = () => {

  const { setVisibleAuthForm, sessionData } = React.useContext(AuthContext);
  const { showNotification } = useNotification();

  const formRef = React.useRef<HTMLDivElement>(null);

  const handleFormOutSlideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (formRef.current && !formRef.current.contains(e.target as HTMLElement)) {
      setVisibleAuthForm(null);
      showNotification("success", "warning");
    }
  }
  return (
    <div
      className=" fixed z-50 w-screen min-h-screen flex justify-center items-center backdrop-blur-md p-2 sm:p-4 lg:p-8 text-white"
      onClick={handleFormOutSlideClick}
    >
      <div className=" w-full max-w-[494px] rounded-large bg-[#121212] p-6 text-white shadow-large" ref={formRef}>
        <h1>Sign up</h1>
      </div>
    </div>
  );
};

export default SignUpModal;
