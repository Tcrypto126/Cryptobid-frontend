"use client"
import React from "react";
import { Input as NextUIInput } from "@nextui-org/react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
  type?: string;
  label?: string;
  tag?: string;
  placeholder?: string;
  text: string;
  disabled?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
  errorMessage?: string;
  handleChange: (vale: string, key?: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  
}, ref) => {
  return (
    <>
    </>
  )
})