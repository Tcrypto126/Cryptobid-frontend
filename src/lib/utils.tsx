import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateAndFormatDate = (inputValue: any) => {
  const numericInput = inputValue.replace(/\D/g, "");

  if (numericInput.length >= 4) {
    return `${numericInput.slice(0, 2)}/${numericInput.slice(2, 4)}`;
  }

  return numericInput;
};
