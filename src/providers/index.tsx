"use client";

import React from "react";
import dynamic from "next/dynamic";

const ThemeProvider = dynamic(() => import("@/providers/themeProvider"), { ssr: false });
const JotaiProvider = dynamic(() => import("@/providers/jotaiProvider"), { ssr: false });
const NotificationProvider = dynamic(() => import("@/providers/notificationProvider"), { ssr: false });

import { NextUIProvider } from "@nextui-org/react";

const ThemeClient = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider>
      <NextUIProvider>
        <JotaiProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </JotaiProvider>
      </NextUIProvider>
    </ThemeProvider>
  )
};

export default ThemeClient;