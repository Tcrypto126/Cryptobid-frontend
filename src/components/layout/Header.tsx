"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Image,
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

import PrimaryButton from "@/components/button";
import { AuthContext } from "@/providers/authProvider";
import { useUserStore } from "@/store";

const Header = () => {
  const menuItems = [
    { title: "Home", link: "/home" },
    { title: "Making Vault", link: "/making-vault" },
    { title: "Dashboard", link: "/dashboard" },
    { title: "Contact Us", link: "/contactus" },
  ];

  const router = useRouter();
  const { signout, user } = useUserStore();
  const { sessionData, setVisibleAuthForm } = React.useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // const [sessionData, setSessionData] = React.useState(false);

  const handleRegisterClick = () => {
    setVisibleAuthForm("SIGN_UP");
  };

  const handleLoginClick = () => {
    setVisibleAuthForm("SIGN_IN");
  };
  const handleSignOut = () => {
    alert("Sign out");
  };

  const profileDropdown = () => {
    const user = {
      userId: "krs",
      image: "/assets/avatar/default.png",
    };
    return (
      <Dropdown placement="bottom-end" className="border">
        <DropdownTrigger>
          <button className="mt-1 transition-transform">
            <Avatar
              isBordered
              showFallback
              name={user?.userId}
              src={user?.image}
            />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem
            key="profile"
            className="h-14 gap-2"
            onClick={() => {
              router.push("/account/settings");
            }}
          >
            <p className="font-semibold">Signed in as</p>
            {/* <p className="font-semibold">{sessionData?.email}</p> */}
            <p className="font-semibold">"aa@aa.com"</p>
          </DropdownItem>
          {/* {
            sessionData ? (
              sessionData?._id === "admin" ? (
                <DropdownItem key="dashboard" color="danger" onClick={() => router.push("/admin/listings")}>
                  Admin Dashboard
                </DropdownItem>
              ) : (
                <DropdownItem key="dashboard" color="danger" onClick={() => router.push("/account/listings")}>
                  Seller Dashboard
                </DropdownItem>
              )
            ) : <></>
          } */}
          <DropdownItem
            key="setting"
            color="danger"
            onClick={() => router.push("/account/listings")}
          >
            Account Setting
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };

  return (
    <Navbar
      classNames={{
        wrapper: "relative border flex gap-2 px-4 h-[100px] w-full max-w-[1440px] ",
        base: "fixed bg-transparent backdrop-blur-sm w-[100%]",
      }}
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <div className=" -z-10 fixed left-0 top-0 w-full h-full bg-gradient-to-b from-black to-transparent"></div>
      <NavbarContent className=" md:hidden order-2">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-white"
        />
      </NavbarContent>

      <NavbarContent className="flex-1 flex">
        <NavbarBrand
          className="hover:cursor-pointer "
          onClick={() => router.push("/")}
        >
          <Image src="/assets/logo.png" alt="logo" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className=" flex-[3] hidden md:flex justify-center gap-8 text-white text-[16px]"
        justify="center"
      >
        {menuItems.map((item) => (
          <NavbarItem key={item.title}>
            {item.link === "/making-vault" ? (
              <PrimaryButton
                isPrimary
                className="bg-transparent !p-0 !text-[16px]"
                onClick={() => {
                  if (!sessionData) {
                    // setVisibleAuthForm('SIGN_IN')
                  } else {
                    router.push(item.link);
                  }
                }}
              >
                {item.title}
              </PrimaryButton>
            ) : (
              <Link className=" text-white" href={item.link}>
                {item.title}
              </Link>
            )}
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent
        className=" flex-1 hidden md:flex justify-end"
        justify="end"
      >
        {!sessionData && (
          <>
            <NavbarItem className="flex gap-4">
              <PrimaryButton
                className="bg-white text-black font-bold w-[105px]"
                onClick={handleRegisterClick}
              >
                Sign up
              </PrimaryButton>
            </NavbarItem>
            <NavbarItem>
              <PrimaryButton
                isPrimary
                className=" font-bold w-[105px]"
                onClick={handleLoginClick}
              >
                sign in
              </PrimaryButton>
            </NavbarItem>
          </>
        )}
        {sessionData && profileDropdown()}
      </NavbarContent>

      <NavbarMenu className=" top-[100px] bg-transparent">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}`}>sdf</NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
export default Header;
