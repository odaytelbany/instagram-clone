"use client";
import Image from "next/image";
import React, { useState } from "react";
import Icon from "/public/1f914.png";
import Link from "next/link";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "@/atoms/modalAtom";

const Header = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [profileDropMenu, setProfileDropMenu] = useState(false);

  return (
    <div className="border-b shadow-sm sticky top-0 bg-white z-50 px-2 md:px-10">
      <div className="flex justify-between items-center max-w-6xl lg:mx-auto">
        <Link
          href={"/"}
          className="relative w-24 h-10 hidden lg:inline-grid cursor-pointer"
        >
          <img
            src="https://links.papareact.com/ocw"
            alt="instagram logo"
            className="object-contain"
          />
        </Link>

        <Link
          href={"/"}
          className="relative w-10 h-10 lg:hidden flex-shrink-0 cursor-pointer"
        >
          <img
            src="https://links.papareact.com/jjm"
            alt="instagram logo"
            className="object-contain"
          />
        </Link>

        {/* middle  */}

        <div className="max-w-screen-sm">
          <div className="relative mt-1 p-3 rounded-md ">
            <div className="absolute flex justify-center items-center inset-y-0 pl-3">
              <SearchIcon className="w-5 h-5 text-grey-500" />
            </div>
            <input
              className="block w-full sm:text-sm bg-gray-50 border-gray-300 focus:border-black focus:ring-black rounded-md pl-10"
              placeholder="Search"
            />
          </div>
        </div>

        {/* right  */}
        <div className="flex items-center justify-end space-x-4">
          <Link href={"/"}>
            <HomeIcon className="navBtn" />
          </Link>
          {!session && (
            <Link
              href="/auth"
              className="font-semibold text-sm flex justify-center items-center !ml-0 md:!ml-4 break-words"
            >
              Sign In
            </Link>
          )}
          {session && (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="w-5 h-5 absolute -top-1 -right-2 text-xs text-white bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  3
                </div>
              </div>
              <PlusCircleIcon
                className="navBtn"
                onClick={() => setOpen(true)}
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <MenuIcon className="navBtn w-10 h-10 overflow-hidden inline-grid md:hidden" />
              <div className="relative h-10 w-10 roundec-full">
                <img
                  src={session?.user?.image}
                  className="rounded-full "
                  onClick={() => setProfileDropMenu((prev) => !prev)}
                />
                {profileDropMenu && (
                  <ul className="absolute top-12 right-0 bg-white w-40 flex flex-col drop-shadow-2xl shadow-2xl rounded-sm">
                    <Link href={"/savedPosts"}>
                      <li className="text-center px-2 py-1 hover:bg-slate-50 transition-all delay-50 cursor-pointer border-b-2 border-gray-200">
                        Saved Posts
                      </li>
                    </Link>
                    <li
                      onClick={signOut}
                      className="text-center px-2 py-1 text-red-500 hover:bg-slate-50 transition-all delay-50 cursor-pointer "
                    >
                      Sign Out
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
