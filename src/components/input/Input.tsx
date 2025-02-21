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
  type,
  label,
  tag,
  text,
  placeholder,
  disabled,
  startContent,
  endContent,
  className,
  errorMessage,
  handleChange
}, ref) => {
  return (
    <NextUIInput
      ref={ref}
      isClearable = {endContent ? false : true}
      radius="lg"
      type={type}
      value={text}
      variant="bordered"
      classNames={{
        input: [
          "!text-zinc-300",
          "placeholder: text-zinc-400",
          "data-invalid",
          "h-full"
        ],
        inputWrapper: [
          "h-[50px]",
          "shadow-xl",
          "rounded-xl",
          "bg-[#18181B]",
          "hover:!bg-zinc-600",
          "group-data-[focus=true]:bg-zinc-600",
          "!cursor-text",
          "border-[1px]",
          "border-[#27272A]",
          "pr-1"
        ].concat(className?.split(" ") || []),
        label: "!text-white"
      }}
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      autoComplete=""
      disabled={disabled}
      startContent={startContent}
      endContent={endContent}
      isInvalid={errorMessage ? true : false}
      errorMessage={errorMessage}
      onClear={endContent ? undefined : () => (tag ? handleChange("", tag) : handleChange(""))}
      onKeyDown={(e) => {
        if (e.key === "Backspace" && !text) {
          tag ? handleChange("", tag) : handleChange("")
        }
      }}
      onChange={(e) => {
        tag ? handleChange(e.target.value, tag) : handleChange(e.target.value)
      }}
    />
  )
});

Input.displayName = "PrimaryInput";

export default Input;