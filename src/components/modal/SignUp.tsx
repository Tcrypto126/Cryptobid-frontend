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
import { PhoneInput } from "../phone-nubmber-input";
import PrimaryButton from "@/components/button";
import Input from "@/components/input/Input";

const SignUpModal: React.FC = () => {
  const { user, setUserData } = useUserStore();
  const { loading, setLoading } = useSettingStore();

  const { setVisibleAuthForm, sessionData } = React.useContext(AuthContext);
  const { showNotification } = useNotification();

  const formRef = React.useRef<HTMLDivElement>(null);
  const phoneInputRef = React.useRef<HTMLDivElement>(null);

  const [userId, setUserId] = React.useState<string>("");
  const [firstName, setFistName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  // const [licenceId, setLicenceId] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [phoneCode, setPhoneCode] = React.useState<RPNInput.Country>();
  const [contactNumber, setContactNumber] = React.useState<string>("");

  const [errors, setErrors] = React.useState<any>({});

  const handleFormOutSlideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      formRef.current &&
      // phoneInputRef.current &&
      // !phoneInputRef.current.contains(e.target as HTMLElement) &&
      !formRef.current.contains(e.target as HTMLElement)
    ) {
      setVisibleAuthForm(null);
      showNotification("success", "success");
    }
  };

  const handleChangeUserId = (value: string) => {
    setUserId(value);
    if ("userId" in errors) setErrors({ ...errors, userId: "" });
  };

  const handleChangeFirstName = (value: string) => {
    setFistName(value);
    if ("firstName" in errors) setErrors({ ...errors, firstName: "" });
  };

  const handleChangeLastName = (value: string) => {
    setLastName(value);
    if ("lastName" in errors) setErrors({ ...errors, lastName: "" });
  };

  const handleChangeEmail = (value: string) => {
    setEmail(value);
    if ("email" in errors) setErrors({ ...errors, email: "" });
  };

  const handleChangePassword = (value: string) => {
    setPassword(value);
    if ("password" in errors) setErrors({ ...errors, password: "" });
  };

  const handleChangeConfirmPassword = (value: string) => {
    setConfirmPassword(value);
    if ("password" in errors) setErrors({ ...errors, password: "" });
  };

  const handleChangeContactNumber = (value: RPNInput.Value) => {
    setContactNumber(value.toString());
    if ("contactNumber" in errors) setErrors({ ...errors, contactNumber: "" });
  };

  const validateFormData = (): boolean => {
    if (!userId) {
      setErrors({
        ...errors,
        userId: "UserId is required",
      });
      return false;
    }
    if (!firstName) {
      setErrors({
        ...errors,
        firstName: "FirstName is required",
      });
      return false;
    }
    if (!lastName) {
      setErrors({
        ...errors,
        lastName: "LastName is required",
      });
      return false;
    }
    if (!email) {
      setErrors({
        ...errors,
        email: "Email is required",
      });
      return false;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErrors({
        ...errors,
        email: "Invalid email format",
      });
      return false;
    }
    // if (!contactNumber) {
    //   setErrors({
    //     ...errors,
    //     contactNumber: "Contact Number is required",
    //   });
    //   return false;
    // }
    // if (!isValidPhoneNumber(contactNumber, phoneCode)) {
    //   setErrors({
    //     ...errors,
    //     contactNumber: "Invalid phone number",
    //   });
    //   return false;
    // }
    if (!password || !confirmPassword) {
      setErrors({
        ...errors,
        password: "Password is required",
      });
      return false;
    }
    if (password.length < 6) {
      setErrors({
        ...errors,
        password: "Password must be at least 6 characters",
      });
      return false;
    }
    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        password: "Password should be matched",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const fullName = firstName + " " + lastName;
    if (!validateFormData()) {
      return;
    }
    setLoading(true);
    try {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      await postServer("/api/auth/signup", { userId, fullName, email, password });
      alert("login success");
    } catch (error) {
      setLoading(false);
      if (error instanceof APIError) {
        return showNotification(error.message, "error");
      }
    }
  };

  const handleChangeToSignInForm = () => {
    setVisibleAuthForm("SIGN_IN");
  };

  return (
    <div
      className=" fixed z-50 w-screen min-h-screen flex justify-center items-center backdrop-blur-md p-2 sm:p-4 lg:p-8 text-white"
      onClick={handleFormOutSlideClick}
    >
      <div
        className=" relative w-full max-w-[494px] rounded-large bg-[#121212] p-6 text-white shadow-large"
        ref={formRef}
      >
        <div className="flex flex-col gap-4">
          <LazyMotion features={domAnimation}>
            <m.div>
              <AnimatePresence initial={true} mode="wait">
                <m.h3
                  animate={{ opacity: 1, x: 0 }}
                  className="text-center"
                  exit={{ opacity: 0, x: -10 }}
                  initial={{ opacity: 0, x: -10 }}
                >
                  Sign Up
                </m.h3>
              </AnimatePresence>
              <AnimatePresence>
                <m.form
                  animate="center"
                  className="mt-6 flex flex-col gap-6"
                  exit="exit"
                  initial="enter"
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    placeholder="Create a username..."
                    type="text"
                    label="Username"
                    text={userId}
                    errorMessage={
                      "userId" in errors && errors.userId ? errors.userId : ""
                    }
                    handleChange={handleChangeUserId}
                  />
                  <m.div className="flex flex-row gap-4">
                    <Input
                      placeholder="Enter your first name"
                      type="text"
                      label="First Name"
                      text={firstName}
                      errorMessage={
                        "firstName" in errors && errors.firstName
                          ? errors.firstName
                          : ""
                      }
                      handleChange={handleChangeFirstName}
                    />
                    <Input
                      placeholder="Enter your last name"
                      type="text"
                      label="Last Name"
                      text={lastName}
                      errorMessage={
                        "lastName" in errors && errors.lastName
                          ? errors.lastName
                          : ""
                      }
                      handleChange={handleChangeLastName}
                    />
                  </m.div>
                  <Input
                    placeholder="Enter your email..."
                    type="email"
                    label="Email"
                    text={email}
                    errorMessage={
                      "email" in errors && errors.email
                        ? (errors.email as string)
                        : ""
                    }
                    handleChange={handleChangeEmail}
                  />
                  {/* <PhoneInput
                    placeholder="Enter a phone number"
                    label="Phone Number"
                    onCountryChange={(country) => {
                      country && setPhoneCode(country);
                    }}
                    onChange={(value) => {
                      handleChangeContactNumber(value);
                    }}
                    error={errors.contactNumber}
                  /> */}
                  <Input
                    placeholder="Enter your password..."
                    type="password"
                    label="Password"
                    text={password}
                    errorMessage={
                      "password" in errors && errors.password
                        ? errors.password
                        : ""
                    }
                    handleChange={handleChangePassword}
                  />
                  <Input
                    placeholder="Confirm your password..."
                    type="password"
                    label="Confirm Password"
                    text={confirmPassword}
                    errorMessage={
                      "password" in errors && errors.password
                        ? errors.password
                        : ""
                    }
                    handleChange={handleChangeConfirmPassword}
                  />
                  <PrimaryButton
                    isPrimary
                    className=" rounded-2xl"
                    onClick={handleSubmit}
                    disabled={loading}
                    icon={
                      loading && <Icon icon="eos-icons:loading" width={20} />
                    }
                  >
                    Sign Up
                  </PrimaryButton>
                </m.form>
                <m.div className=" flex flex-row gap-0 justify-center items-center mt-6">
                  <p>Have an account?</p>
                  <PrimaryButton
                    className="bg-transparent !p-0"
                    onClick={handleChangeToSignInForm}
                  >
                    Sign In
                  </PrimaryButton>
                </m.div>
                <m.div className=" flex flex-col gap-3 mt-4 justify-center">
                  <p className=" text-center">or you can sign in with</p>
                  <div className=" flex flex-row gap-3 justify-center">
                    <Icon icon="mdi-light:home" />
                    <Icon icon="mdi-light:home" />
                    <Icon icon="mdi-light:home" />
                  </div>
                </m.div>
              </AnimatePresence>
            </m.div>
          </LazyMotion>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
