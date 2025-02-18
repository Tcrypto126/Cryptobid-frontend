import type { Metadata } from "next";
import { cookies } from "next/headers";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

import Provider from "@/providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const onest = localFont({
  src: [
    {
      path: "../../public/assets/font/Onest.ttf"
    },
  ],
  variable: "--font-onest",
});

const brightown = localFont({
  src: [
    {
      path: "../../public/assets/font/Brightown.otf"
    },
  ],
  variable: "--font-brightown",
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "CryptoBid",
  description: "Generated by create next app",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon.png",
        href: "/favicon.png",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = cookies().get("user_session")?.value || null;

  return (
    <html lang="en" suppressHydrationWarning={true} className="!dark">
      <body
        className={`${brightown.variable} ${onest.variable} bg-black`} suppressHydrationWarning={true}
      >
        <Provider>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
