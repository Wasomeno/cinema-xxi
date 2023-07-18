import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export const FormContainer = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="flex w-full flex-col items-center justify-start gap-2"
    >
      {children}
    </form>
  );
};

export const FormTextArea = ({ id, value, setValue, width }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      className={
        "h-40 rounded-lg border border-slate-500 p-2 font-poppins text-xs dark:bg-slate-700 lg:text-sm" +
        " " +
        "w-" +
        width
      }
    />
  );
};

export const FormInput = ({
  type,
  className,
  value,
  setValue,
  id,
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      id={id}
      className={twMerge(
        clsx(
          "h-8 w-full rounded-md border border-slate-500 p-2 font-poppins text-xs focus:outline-none dark:bg-slate-700 lg:text-xs",
          className
        )
      )}
      onChange={(event) => setValue(event.target.value)}
      {...props}
    />
  );
};

export const FormSubmit = ({ width, value }) => {
  return (
    <input
      type="submit"
      value={value}
      className={
        (width ? "w-" + width : "w-full") +
        " cursor-pointer rounded-lg bg-slate-800 p-2 font-poppins text-xs font-medium text-white dark:bg-gray-600 lg:text-xs"
      }
    />
  );
};