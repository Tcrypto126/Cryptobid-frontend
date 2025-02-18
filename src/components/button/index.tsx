"use client";
import { Button } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

import type { FC } from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  varient?: "small" | "large";
  isPrimary?: boolean;
  isIconOnly?: boolean;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

const PrimaryButton: FC<ButtonProps> = ({
  type="button",
  varient="large",
  isPrimary,
  isIconOnly,
  icon,
  disabled,
  className,
  children, 
  onClick, 
}) => {
  return (
    <Button 
      type={type}
      isIconOnly={isIconOnly}
      className={twMerge(
        `bg-[#27272A] text-white rounded-md h-auto py-[8px] sm:px-[25px] sm:py-[14px] text-xs sm:text-sm`, 
        isPrimary && 'bg-[#EC010F]',
        varient === "small" && "sm:px-[14px] sm:py-[10px]",
        className
      )}
      
      disabled={disabled}
      startContent={icon}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;