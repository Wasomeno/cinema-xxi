import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import React from "react";
import { twMerge } from "tailwind-merge";

import AnimatedContainer from "./AnimatedContainer";
import { Button } from "./Button";
import ChevronRight from "./Icons/ChevronRight";
import Power from "./Icons/Power";

const ManagerMenuModal = ({ toggleShowUserModal }) => {
  const { data: sessionData } = useSession();
  const { setTheme, theme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (!sessionData) return;
  return (
    <>
      <AnimatedContainer
        onClick={toggleShowUserModal}
        className="z-15 fixed left-0 bottom-0 h-screen w-screen bg-black bg-opacity-70"
      />
      <AnimatedContainer className="fixed bottom-0 z-20 flex h-80 w-full flex-col gap-4 rounded-t-lg bg-slate-100 p-4 dark:bg-slate-800 md:top-12 md:right-5 md:h-96 md:w-80 md:rounded-lg">
        <div className="mx-auto h-1 w-2/6 rounded-full bg-gray-400 bg-opacity-25" />
        <div className="flex w-full items-center justify-between">
          <div className="flex w-5/12 items-center justify-between md:w-3/6">
            <div className="h-8 w-8 rounded-full border-2 bg-blue-400" />
            <p className="w-8/12 font-poppins text-sm font-medium tracking-wider text-slate-900 dark:text-slate-50">
              {sessionData.user.name}
            </p>
          </div>
          <div className="flex w-2/6 items-center justify-end gap-2 md:w-3/6">
            <Button
              onClick={() => signOut({ redirect: false })}
              className="bg-slate-200 dark:bg-slate-700"
              size="small"
            >
              <Power color="stroke-slate-900 dark:stroke-slate-50" size="4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <button className="flex w-full justify-between rounded-md bg-slate-400 bg-opacity-25 p-3 font-poppins text-sm text-slate-900 first-letter:items-center dark:text-slate-50">
            <span>Actions</span>
            <ChevronRight
              color="stroke-slate-900 dark:stroke-slate-400"
              size="5"
            />
          </button>
          <div className="flex w-full items-center justify-between rounded-md bg-slate-400 bg-opacity-25 p-3 font-poppins text-sm text-slate-900 dark:text-slate-50">
            <span>Theme</span>
            <button
              onClick={() => {
                if (currentTheme === "dark") {
                  setTheme("light");
                } else {
                  setTheme("dark");
                }
              }}
              className={twMerge(
                "relative flex h-5 w-2/12 items-center justify-between rounded-full transition-all duration-300 ease-in-out",
                currentTheme === "light" && "bg-gray-400",
                currentTheme === "dark" && "bg-slate-800"
              )}
            >
              <span
                className={twMerge(
                  "absolute h-4 w-4 rounded-full bg-slate-50 shadow-md backdrop-blur-md transition-all duration-300 ease-in-out",
                  currentTheme === "light" && "left-0",
                  currentTheme === "dark" && "right-0"
                )}
              />
            </button>
          </div>
        </div>
      </AnimatedContainer>
    </>
  );
};

export default ManagerMenuModal;
