import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  userId?: string;
  image?: string;
  creditInfo?: {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expDate: string;
  },
}

interface UserState {
  user?: User;
  setUserData: (data: User) => void;
  signout: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: undefined,
      setUserData: (data: User) => {
        console.log(data);
        set({ user: data })
      },
      signout: () => {
        set({ user: undefined })
      }
    }),
    {
      name: "loginStatus"
    }
  )
)