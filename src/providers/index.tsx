"use client";

import React from "react";
import dynamic from "next/dynamic";

const ThemeProvider = dynamic(() => import("@/providers/themeProvider"), { ssr: false });
const JotaiProvider = dynamic(() => import("@/providers/jotaiProvider"), { ssr: false });
const NotificationProvider = dynamic(() => import("@/providers/notificationProvider"), { ssr: false });


const ThemeClient = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    {children}
  )
};
